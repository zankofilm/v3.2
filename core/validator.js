
function validateFile(data){
  if(!data) return {ok:false,error:"empty"}
  if(!Array.isArray(data.patients)) return {ok:false,error:"invalid structure"}
  return {ok:true}
}

function previewFile(data){
  return {
    patientsCount: data.patients?.length || 0,
    sample: data.patients?.slice(0,3) || []
  }
}

module.exports = {validateFile,previewFile}
