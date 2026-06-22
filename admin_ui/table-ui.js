
let state = {data:[]};
let currentSort = {key:null,dir:1};

function renderTable(id, data, columns){
  const box = document.getElementById(id);
  if(!box) return;

  let filtered = data;

  const searchVal = document.getElementById("search")?.value?.toLowerCase();
  if(searchVal){
    filtered = filtered.filter(r =>
      Object.values(r).join(" ").toLowerCase().includes(searchVal)
    );
  }

  if(currentSort.key){
    filtered = [...filtered].sort((a,b)=>{
      if(a[currentSort.key] > b[currentSort.key]) return currentSort.dir;
      if(a[currentSort.key] < b[currentSort.key]) return -currentSort.dir;
      return 0;
    });
  }

  let html = "<table border='1' style='width:100%;border-collapse:collapse'>";
  html += "<tr>";
  columns.forEach(c=>{
    html += `<th onclick="sortTable('${c}')">${c}</th>`;
  });
  html += "</tr>";

  filtered.forEach(row=>{
    html += "<tr>" + columns.map(c=>`<td>${row[c] ?? "-"}</td>`).join("") + "</tr>";
  });

  html += "</table>";
  box.innerHTML = html;
}

function sortTable(key){
  if(currentSort.key === key){
    currentSort.dir *= -1;
  } else {
    currentSort.key = key;
    currentSort.dir = 1;
  }
  loadMock();
}

function exportCSV(){
  let rows = state.data;
  if(!rows.length) return;

  const keys = Object.keys(rows[0]);
  let csv = keys.join(",") + "
";

  rows.forEach(r=>{
    csv += keys.map(k=>`"${r[k] ?? ""}"`).join(",") + "
";
  });

  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  a.click();
}

function loadMock(){
  state.data = [
    {name:"NGO A",patients:1200,activity:"high",growth:18},
    {name:"NGO B",patients:900,activity:"mid",growth:10}
  ];

  renderTable("table", state.data, ["name","patients","activity","growth"]);
}

document.addEventListener("DOMContentLoaded", loadMock);
