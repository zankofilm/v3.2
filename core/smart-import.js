
const crypto = require('crypto')

const registry = new Map() // hash -> data

function hashData(data){
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')
}

function diff(oldD,newD){
  const oldP = oldD?.patients||[]
  const newP = newD?.patients||[]

  const added = newP.filter(x=>!oldP.find(y=>y.id===x.id))
  const removed = oldP.filter(x=>!newP.find(y=>y.id===x.id))

  return {added,removed}
}

function importSmart(raw){
  let data
  try{
    data = JSON.parse(raw)
  }catch(e){
    return {ok:false,error:"invalid json"}
  }

  const h = hashData(data)

  if(registry.has(h)){
    return {
      status:"duplicate",
      message:"file already exists",
      hash:h,
      action:["reject","overwrite"]
    }
  }

  let prev = [...registry.values()].pop()

  let result = {
    status:"new",
    hash:h,
    action:["accept"],
    preview:{
      count:data.patients?.length||0
    }
  }

  if(prev){
    result.status="modified"
    result.diff = diff(prev,data)
    result.action=["accept","reject","merge"]
  }

  registry.set(h,data)

  return result
}

module.exports = {importSmart}
