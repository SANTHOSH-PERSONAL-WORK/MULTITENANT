const mongoose = require("mongoose");
const Tenant = require("../schema/tenant-schema");

const connectionPool = {};

// Create dynamic tenant connection
const getTenantConnection = async (tenantDomain) => {
  if (!connectionPool[tenantDomain]) {
    const tenant = await Tenant.findOne({ domain: tenantDomain });
    if (!tenant) throw new Error("Tenant not found");

    const connection = mongoose.createConnection(tenant.dbURI);
    connectionPool[tenantDomain] = connection;
  }
  return connectionPool[tenantDomain];
};

// Handle tenant middleware 
const tenantMiddleware = async (req, res, next) => {
  const tenantDomain = req.cookies['tenantDomain'];
  if (!tenantDomain) return res.status(400).json({ error: "Tenant domain is required" });

  try {
    const tenantConnection = await getTenantConnection(tenantDomain);
    req.tenantConnection = tenantConnection;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const tenantConnection = async () => {
  try {
    const findTenants = await Tenant.find();
    for (const tenant of findTenants) {
      const { domain, dbURI } = tenant;
      if (!connectionPool[domain]) {
        const connection = mongoose.createConnection(dbURI);
        connectionPool[domain] = connection;
        console.log(`connection establised for tenant : ${domain}`)
      }
    }
  } catch (error) {
    console.log("error")
  }

}

module.exports = {tenantMiddleware, tenantConnection};