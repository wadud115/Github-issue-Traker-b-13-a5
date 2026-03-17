
const BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

let currentTab = "all";


// load issue

const loadIssues = async ()=>{

    
  const res = await fetch(`${BASE}/issues`);
  const data = await res.json();

  let issues = data.data;

  if (currentTab !== "all") {
    issues = issues.filter(i => i.status === currentTab);
  }

  displayIssues(issues);

    


}

// display issue


const displayIssues = (issues) =>{
 const container = document.getElementById("issues");
  container.innerHTML = "";

  document.getElementById("count").innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const div = document.createElement("div");
    div.className = `card ${issue.status}`;

    div.innerHTML = `
      <h4>${issue.title}</h4>
      <p>${issue.description}</p>

      <p><b>Author:</b> ${issue.author}</p>
      <p><b>Priority:</b> ${issue.priority}</p>

      <span class="label">${issue.label}</span>
    `;

    div.onclick = () => openModal(issue.id);

    container.appendChild(div);


  });
}



// call issue

function changeTab(tab, el) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  el.classList.add("active");

  loadIssues();
}



async function openModal(id) {
  const res = await fetch(`${BASE}/issue/${id}`);
  const data = await res.json();
  const i = data.data;

  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <h2>${i.title}</h2>
    <p>${i.description}</p>

    <p><b>Status:</b> ${i.status}</p>
    <p><b>Author:</b> ${i.author}</p>
    <p><b>Priority:</b> ${i.priority}</p>
    <p><b>Label:</b> ${i.label}</p>

    <button onclick="closeModal()">Close</button>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

loadIssues();










