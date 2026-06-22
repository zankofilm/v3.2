
const crypto = require('crypto')

const roles = {
  admin: ["READ","WRITE","IMPORT","EXPORT","AUDIT"],
  operator: ["READ","IMPORT"],
  viewer: ["READ"]
}

function checkPermission(role, action){
  return roles[role]?.includes(action)
}

function secureHash(data){
  return crypto.createHash("sha512").update(JSON.stringify(data)).digest("hex")
}

function verifyIntegrity(data, hash){
  return secureHash(data) === hash
}

module.exports = {checkPermission, secureHash, verifyIntegrity}
