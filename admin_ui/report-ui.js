
function renderReport(state){
  const box = document.getElementById("reportBox")
  if(!box) return

  const report = {
    patients: state?.patients?.length || 0,
    logs: state?.logs?.length || 0
  }

  box.innerHTML = `
    <h3>گزارش سیستم</h3>
    <p>مددجوها: ${report.patients}</p>
    <p>لاگ‌ها: ${report.logs}</p>
  `
}
