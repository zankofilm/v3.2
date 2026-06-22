
function governmentReport(state){
  return {
    classification:"GOVERNMENT_CONFIDENTIAL",
    summary:{
      ngos: state?.data?.length || 0,
      totalPatients: state?.data?.reduce((s,n)=>s+(n.patients||0),0)
    },
    compliance:{
      auditEnabled:true,
      encryption:"SHA-512",
      dataIntegrity:"ACTIVE"
    },
    riskLevel: "LOW"
  }
}

module.exports = {governmentReport}
