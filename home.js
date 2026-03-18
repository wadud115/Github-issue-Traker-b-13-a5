




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





// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }


const displayIssues = (issues) =>{
 const container = document.getElementById("issues");
  container.innerHTML = "";

  document.getElementById("count").innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const div = document.createElement("div");
    div.className = `card ${issue.status}`;

    div.innerHTML = `
     <p class="priority"> ${issue.priority}</p>
      <h4 class="font-bold text-xl ">${issue.title}</h4>
      <p class="text-[#64748B]">${issue.description}</p>

      

      

      <p class="text-[#64748B] py-5 mt-5 border-t-2 "><span>#1</span> ${issue.author}</p>
      

       

      
      <p class="text-[#64748B]  ">1/15/2024</p>


    `;

    div.onclick = () => openModal(issue.id);

    container.appendChild(div);


  });
}


// search 

async function searchIssue() {
  const text = document.getElementById("search").value;

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










