
const { calculateKPIs } = require('../core/kpi-engine');
const { generateInsights } = require('../core/analytics');

let state = {
  data: [
    {name:"NGO A",patients:1200,growth:18},
    {name:"NGO B",patients:900,growth:10}
  ]
};

function drawBar(value){
  const ctx = document.getElementById("chart").getContext("2d");
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(50, 50, value, 50);
}

function render(){
  const kpi = calculateKPIs(state);
  const insights = generateInsights(kpi);

  document.getElementById("kpiBox").innerHTML =
    `NGOs: ${kpi.totalNGOs} | Patients: ${kpi.totalPatients} | Health: ${kpi.healthScore}`;

  document.getElementById("insights").innerHTML =
    insights.map(i=>"<p>"+i+"</p>").join("");

  drawBar(kpi.healthScore * 2);
}

document.addEventListener("DOMContentLoaded", render);
