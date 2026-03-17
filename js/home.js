const cardSection = document.getElementById("card-section");
const tabInactive = ["bg-navy", "border-navy"];
const tabActive = ["bg-black", "border-slate-200", "text-white"];
const currentTab = "all";
const countIssues = document.getElementById("count-issues");
const input = document.getElementById("search-bar");
const loadSpinner = document.getElementById("load-spinner")



// Button toggling
const clickedBtn = (tab) => {
  const buttons = ["all", "open", "close"];
  for(const b of buttons){
    const tabs = document.getElementById(b + "-btn")
    if(tab === b){
      tabs.classList.add(...tabActive)
    }
    else{
      tabs.classList.remove(...tabActive)
      tabs.classList.add(...tabInactive)
    }
  }
}
clickedBtn(currentTab)

// loading spinner
// loading spinner
const spinner = (state) => {
  if(state == true){
    cardSection.classList.add("hidden");
    loadSpinner.classList.remove("hidden");
  }
  else{
    loadSpinner.classList.add("hidden");
    cardSection.classList.remove("hidden");
  }
}

// Count issues
const countCard = () => {
  const totalCard = cardSection.children.length
  countIssues.innerText = totalCard;
}

//initially load all card data when land on the landing page
const initiallyLoadAlIssues = async () => {
   spinner(true);
   const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
   const res = await fetch(url)
   const jsObject = await res.json()
   displayAllIssues(jsObject.data);
   countCard();

}
initiallyLoadAlIssues()
//**initially display all card data when land on the landing page**//
const displayAllIssues = (objects) => {

    cardSection.innerText = "";
    objects.forEach(object => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div onclick = "loadModal(${object.id})"
          class="card-class w-full p-6 bg-white rounded-xl shadow-sm h-full flex flex-col border-t-4 ${object.status==="open"?"border-t-green-700":" border-t-violet-800"}">
          <div class="flex justify-between items-center mb-4">
            <img src="assets/Open-Status.png" alt class="w-6 h-6">

            <button onclick = "loadModal(${object.id})"
              class="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full">
              ${object.priority.toUpperCase()}
            </button>
          </div>

          <div class="mb-4">
            <h2 class="text-lg font-bold text-slate-800 mb-2">
              ${object.title}
            </h2>

            <p class="text-slate-500 text-sm">
              ${object.description.length < 70? object.description:object.description.slice(0, 70) + "..." }
            </p>
          </div>

          <div class="flex flex-wrap gap-1 pb-4">
            <div
              class="labels flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 px-3 py-1 rounded-full text-[10px] font-semibold ${object.labels[0]?"block": "hidden"}">
              ${object.labels[0]?`
                <i class="fa-solid fa-bug"></i>${object.labels[0].toUpperCase()}`: ""}
            </div>

            <div
              class="flex items-center gap-1 bg-orange-50 border border-orange-100 text-yellow-600 px-3 py-1 rounded-full text-[10px] font-semibold
              ${object.labels[1]?"block": "hidden"}">
              ${object.labels[1]?`<i class="fa-solid fa-helicopter-symbol"></i>${object.labels[1].toUpperCase()}`: ""}   
            </div>
          </div>

          <div class="text-slate-500 text-xs mt-auto border-t border-gray-300 p-2">
            <p class="mb-1">#${object.id} by <span class="font-medium">${object.author}</span></p>
            <p>${object.createdAt.split("T")[0]}</p>
          </div>
        </div>
        `;
        cardSection.appendChild(div)
    });
    spinner(false);
}


// load all card data when all button is clicked
const loadAllIssues = async () => {
    spinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayAllIssues(jsObject.data);
    countCard();
}

// load open card data when open button is clicked
const loadOpenIssues = async () => {
    spinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayOpenIssues(jsObject.data);
    countCard();
}
// Display open card data when open button is clicked
const displayOpenIssues = (objects) => {
  cardSection.innerText = "";
  const openCard = objects.filter(object => object.status === "open" );
  displayAllIssues(openCard);
}

// load open card data when open button is clicked
const loadCloseIssues = async () => {
    spinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayCloseIssues(jsObject.data);
    countCard();
}
// Display open card data when open button is clicked
const displayCloseIssues = (objects) => {
  cardSection.innerText = "";
  const closeCard = objects.filter(object => object.status === "closed" );
  displayAllIssues(closeCard);
}

// Load modal
const loadModal = async (id) => {
  modalSection.showModal();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const response = await fetch(url)
  const jsObject = await response.json()
  displayModal(jsObject.data);
}
// Display modal
const displayModal = (object) =>{
  modalSection.innerText = "";
  const div = document.createElement("div")
  div.innerHTML = `
<div class="max-w-md mx-auto overflow-hidden bg-slate-50 rounded-lg">
  <div class="p-6 md:p-8">

    <!-- Title & Meta -->
    <div class="mb-4">
      <h2 class="text-xl font-bold text-slate-800 mb-2">${object.title}</h2>
      <div class="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span class="bg-green-500 text-white px-2 py-0.5 rounded-xl text-[10px] font-bold uppercase">
          ${object.status}
        </span>
        <span>- Opened by <span class="font-semibold text-slate-600">${object.author}</span></span>
        <span>- ${object.createdAt}</span>
      </div>
    </div>

    <!-- Labels -->
    <div class="flex gap-2 mb-6">
      <span class="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold uppercase flex items-center gap-1">
        ${object.labels[0] ? `<i class="fa-solid fa-bug"></i>${object.labels[0].toUpperCase()}`: ""}
      </span>
      <span class="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold uppercase flex items-center gap-1 ${object.labels[1]? "block" : "hidden"}">
        ${object.labels[1] ? `<i class="fa-solid fa-bug"></i>${object.labels[1].toUpperCase()}`: ""}
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-500 text-sm mb-8">
      ${object.description}
    </p>

    <!-- Assignee & Priority -->
    <div class="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-100 mb-8">
      <div class="border-r border-slate-200 pr-2">
        <p class="text-[10px] text-slate-400 uppercase font-bold mb-1">Assignee:</p>
        <p class="text-sm font-bold text-slate-700">${object.assignee}</p>
      </div>
      <div class="pl-2">
        <p class="text-[10px] text-slate-400 uppercase font-bold mb-1">Priority:</p>
        <span class="bg-red-500 text-white text-[9px] px-2.5 py-0.5 rounded-full uppercase shadow-sm font-bold">${object.priority}</span>
      </div>
    </div>

    <!-- Close Button aligned right -->
    <div class="flex justify-end">
      <form method="dialog">
        <button class="btn px-4 py-2 bg-slate-200 rounded hover:bg-slate-300">Close</button>
      </form>
    </div>

  </div>
</div>
  `;
  modalSection.appendChild(div);
}

// Search functionality
// input.addEventListener("input", async (e) => {
//   let inputValue = input.value
//   const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`  
//   const res = await fetch(url);
//   const jsObject = await res.json();
//   console.log(jsObject);
// })






