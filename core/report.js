
function generateReport(state){
  return {
    totalPatients: state?.patients?.length || 0,
    timestamp: new Date().toISOString()
  }
}

module.exports = {generateReport}
