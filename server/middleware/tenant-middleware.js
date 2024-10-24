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
console.log(connectionPool,'san')
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

module.exports = tenantMiddleware;