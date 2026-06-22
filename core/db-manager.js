
const fs = require('fs')
const crypto = require('crypto')
const { safeRollback } = require('./db-restore')

let DB_PATH = "./database.json"

function loadDB(){
  if(!fs.existsSync(DB_PATH)) return {patients:[],logs:[],meta:{}}
  return JSON.parse(fs.readFileSync(DB_PATH,'utf-8'))
}

function saveDB(db){
  fs.writeFileSync(DB_PATH, JSON.stringify(db,null,2))
}

function backupDB(){
  const db = loadDB()
  const backupName = "./backup_" + Date.now() + ".json"
  fs.writeFileSync(backupName, JSON.stringify(db,null,2))
  return backupName
}

function resetDatabase(password){
  const ADMIN_HASH = crypto.createHash('sha256').update("admin123").digest('hex')
  const inputHash = crypto.createHash('sha256').update(password).digest('hex')

  if(ADMIN_HASH !== inputHash){
    return {ok:false,error:"invalid password"}
  }

  const backupFile = backupDB()
  saveDB({patients:[],logs:[],meta:{resetAt:new Date().toISOString()}})

  return {ok:true,backup:backupFile}
}

function restoreLatest(){
  return safeRollback()
}

module.exports = {
  loadDB,
  saveDB,
  backupDB,
  resetDatabase,
  restoreLatest
}
