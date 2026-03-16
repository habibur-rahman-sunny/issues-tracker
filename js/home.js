const cardSection = document.getElementById("card-section");
const allBtn = document.getElementById("all-btn")


// load all card data when all button is clicked
const loadAllIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayAllIssues(jsObject.data);
    allBtn.classList.add("active")
}
// Display card data when all button is clicked
const displayAllIssues = (objects) => {

    cardSection.innerText = "";
    objects.forEach(object => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div
          class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

          <div class="flex justify-between items-center mb-4">
            <img src="assets/Open-Status.png" alt class="w-6 h-6">

            <span
              class="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full">
              ${object.priority.toUpperCase()}
            </span>
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
              class="labels flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 px-3 py-1 rounded-full text-[10px] font-semibold">
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
}




const loadOpenIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayOpenIssues(jsObject.data);
    allBtn.classList.add("active")
}
// load open card data when open button is clicked
const displayOpenIssues = (objects) => {
  cardSection.innerText = "";
  const openCard = objects.filter(object => object.status === "open" );
  console.log(openCard);
  openCard.forEach(object => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div
          class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

          <div class="flex justify-between items-center mb-4">
            <img src="assets/Open-Status.png" alt class="w-6 h-6">

            <span
              class="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full">
              ${object.priority.toUpperCase()}
            </span>
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
              class="labels flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 px-3 py-1 rounded-full text-[10px] font-semibold">
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
}


const loadCloseIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url)
    const jsObject = await res.json()
    displayCloseIssues(jsObject.data);
    allBtn.classList.add("active")
}
// load open card data when open button is clicked
const displayCloseIssues = (objects) => {
  cardSection.innerText = "";
  const openCard = objects.filter(object => object.status === "closed" );
  console.log(openCard);
  openCard.forEach(object => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div
          class="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

          <div class="flex justify-between items-center mb-4">
            <img src="assets/Open-Status.png" alt class="w-6 h-6">

            <span
              class="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full">
              ${object.priority.toUpperCase()}
            </span>
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
              class="labels flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 px-3 py-1 rounded-full text-[10px] font-semibold">
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
}