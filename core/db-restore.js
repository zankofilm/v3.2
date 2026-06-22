
const fs = require('fs')

function listBackups(){
  return fs.readdirSync('.')
    .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
}

function restoreFromBackup(file){
  if(!fs.existsSync(file)){
    return {ok:false,error:"backup not found"}
  }

  const data = JSON.parse(fs.readFileSync(file,'utf-8'))

  fs.writeFileSync("./database.json", JSON.stringify(data,null,2))

  return {
    ok:true,
    message:"database restored",
    restoredFrom:file
  }
}

function safeRollback(){
  const backups = listBackups()
  if(backups.length === 0){
    return {ok:false,error:"no backups"}
  }

  const last = backups.sort().pop()
  return restoreFromBackup(last)
}

module.exports = {
  listBackups,
  restoreFromBackup,
  safeRollback
}
