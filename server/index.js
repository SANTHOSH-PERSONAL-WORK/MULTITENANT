const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require('dotenv').config();

const { dbConnection } = require("./db-connection");
const TenantInfo = require("./schema/tenant-schema");
const UserSchema = require("./schema/user-schema");
const {tenantMiddleware, tenantConnection} = require("./middleware/tenant-middleware");

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// User register api
app.post("/api/tenant/register", async (req, res) => {
  try {
    const { name, domain, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbURI = `${process.env.DB_CONNECTION_BASE_STRING}/${domain}`;

    const connection = mongoose.createConnection(dbURI);

    connection.model("User", UserSchema);
    const getTenantDomain = await TenantInfo.findOne({ domain });

    if( getTenantDomain !== null ){
      throw new Error('Domain already exist')
    }

    await TenantInfo.create({ name, domain, dbURI, password: hashedPassword });
    await tenantConnection();
    res.status(201).json({ message: "Tenant registered successfully" });
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});

// User login api
app.post("/api/tenant/login", async (req, res) => {
  try {
    const { domain, password } = req.body;
    const tenant = await TenantInfo.findOne({ domain });

    if (!tenant || !(await bcrypt.compare(password, tenant.password))) {
      return res.status(401).send("Invalid credentials");
    }

    res.cookie('tenantDomain', domain, {
      httpOnly: true,
      sameSite: 'Strict'
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});

// Middleware
app.use("/api/tenant/:tenantDomain", tenantMiddleware);

// Add user api
app.post("/api/tenant/:tenantDomain/addUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = req.tenantConnection.model("User", UserSchema);
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("User already exists");

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ newUser, message: "User added successfully" });
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});

// Get user api
app.get("/api/tenant/:tenantDomain/getUser", async (req, res) => {
  try {
    const User = req.tenantConnection.model("User", UserSchema);
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});

// Delete user api
app.delete("/api/tenant/:tenantDomain/deleteUser", async (req, res) => {
  try {
    const { id } = req.body; 
    const User = req.tenantConnection.model("User", UserSchema);
    const result = await User.deleteOne({ _id: id }); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});

// Update user api
app.put("/api/tenant/:tenantDomain/updateUser", async (req, res) => {
  try {
    const { id, newData } = req.body;     
    const User = req.tenantConnection.model("User", UserSchema);
    const result = await User.updateOne(
      { _id: id },  
      { $set: newData } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", result });
    
  } catch (error) {
    res.status(500).send({ "InternalServerError": error.message });
  }
});


dbConnection()
  .then( async(message) => {
    await tenantConnection();
    app.listen(PORT, () => {
      console.log(`${message}\nServer running on Port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
  