
function buildReport(state){
  const patients = state?.patients || []
  const logs = state?.logs || []

  const report = {
    meta:{
      version:"3.2.3",
      createdAt:new Date().toISOString()
    },
    summary:{
      totalPatients:patients.length,
      totalLogs:logs.length,
      active:patients.filter(p=>p.active!==false).length
    },
    analytics:{
      growth: patients.length > 0 ? "active" : "empty",
      logRate: logs.length
    },
    details:{
      patients,
      logs
    }
  }

  return report
}

function exportReport(state){
  const r = buildReport(state)
  return JSON.stringify(r,null,2)
}

module.exports = {buildReport,exportReport}
