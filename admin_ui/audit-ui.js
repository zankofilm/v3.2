
function renderAudit(logs){
  const box = document.getElementById("auditBox")
  if(!box) return

  box.innerHTML = "<h3>Audit Log</h3>"

  logs.slice(-10).reverse().forEach(l=>{
    box.innerHTML += `
      <div class='item'>
        <b>${l.action}</b><br/>
        <small>${l.time}</small>
      </div>
    `
  })
}

function refreshAudit(){
  if(window.lastAudit){
    renderAudit(window.lastAudit)
  }
}
