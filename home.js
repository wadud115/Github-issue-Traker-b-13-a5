

const btn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

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

  console.log(issues);
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


     const labelsHTML = issue.labels.map(label => {
      return `<span class="label bg-amber-300 p-1 my-3 rounded-sm   ${label.replace(" ", "-")}">${label}</span>`;
    }).join(" ");

    div.innerHTML = `
     <p class="priority"> ${issue.priority}</p>
      <h4 class="font-bold text-xl ">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}</p>

      
      <div class ="">
      <div class="labels">${labelsHTML}</div>
      </div>

      

      <p class="text-[#64748B] py-5 mt-5 border-t-2 "><span>#1</span> ${issue.author}</p>
      

       

      
      <p class="text-[#64748B]  ">${issue.createdAt}</p>


    `;

    div.onclick = () => openModal(issue.id);

    container.appendChild(div);


  });
}


// search 

async function searchIssue() {
  const desktop = document.getElementById("search-desktop");
  const mobile = document.getElementById("search-mobile");
  const text = desktop.value || mobile.value;

  const res = await fetch(`${BASE}/issues/search?q=${text}`);
  const data = await res.json();

  displayIssues(data.data);
}



// call issue

function changeTab(tab, el) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  el.classList.add("active");

  loadIssues();
}




loadIssues();














