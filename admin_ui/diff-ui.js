
let currentDiff = null

function renderDiff(diff){
  const box = document.getElementById("diffBox")
  if(!box) return

  box.innerHTML = ""

  const added = diff?.added || []
  const removed = diff?.removed || []

  box.innerHTML += `<h3>اضافه شده (${added.length})</h3>`
  added.forEach(x=>{
    box.innerHTML += `<div class='item'>➕ ${x.name || x.id}</div>`
  })

  box.innerHTML += `<h3>حذف شده (${removed.length})</h3>`
  removed.forEach(x=>{
    box.innerHTML += `<div class='item'>➖ ${x.name || x.id}</div>`
  })
}

function accept(){
  alert("accepted")
}

function reject(){
  alert("rejected")
}

function merge(){
  alert("merged")
}
