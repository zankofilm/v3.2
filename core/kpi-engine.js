
function calculateKPIs(state){
  const ngos = state?.data || [];

  const totalNGOs = ngos.length;
  const totalPatients = ngos.reduce((s,n)=>s+(n.patients||0),0);

  const avgPatients = totalNGOs ? totalPatients/totalNGOs : 0;

  const growthScore = ngos.reduce((s,n)=>s+(parseFloat(n.growth)||0),0)/ (totalNGOs||1);

  const healthScore = Math.min(100, (avgPatients/10));

  return {
    totalNGOs,
    totalPatients,
    avgPatients,
    growthScore,
    healthScore: Math.round(healthScore)
  };
}

module.exports = {calculateKPIs};
