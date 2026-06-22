
function generateInsights(kpi){
  const insights = [];

  if(kpi.healthScore < 50){
    insights.push("System health is LOW");
  } else {
    insights.push("System health is OK");
  }

  if(kpi.growthScore > 15){
    insights.push("High growth detected");
  }

  return insights;
}

module.exports = {generateInsights};
