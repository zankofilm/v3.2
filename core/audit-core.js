
const logs = []

function audit(action, payload={}, user="system"){
  const entry = {
    id: Date.now(),
    user,
    action,
    payload,
    hash: require('crypto').createHash('sha256').update(JSON.stringify(payload)).digest('hex'),
    timestamp: new Date().toISOString(),
    immutable:true
  }

  logs.push(entry)
  return entry
}

function getLogs(){
  return logs
}

module.exports = {audit, getLogs}
