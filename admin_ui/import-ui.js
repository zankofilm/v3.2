
function handleResult(res){
  console.log(res)

  if(res.status==="duplicate"){
    alert("فایل تکراری است")
  }

  if(res.status==="modified"){
    console.log("diff:",res.diff)
  }
}
