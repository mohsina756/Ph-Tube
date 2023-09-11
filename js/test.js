/* Category Button */
const category = async () => {
   const res = await fetch(
     `https://openapi.programming-hero.com/api/videos/categories`
   );
   const data = await res.json();
   const categoryField = document.getElementById("categoryField");
   data.data.forEach((element) => {
     const newButton = document.createElement("div");
     newButton.classList.add("flex", "justify-center");
     newButton.innerHTML = `
     <button  onclick="Videos(${element.category_id})" class="btn  text-black focus:bg-lal focus:text-white">${element.category}</button>
     `;
     categoryField.appendChild(newButton);
   });
 };
 /* Video Part */
 const Videos = async (value) => {
   const res = await fetch(
     `https://openapi.programming-hero.com/api/videos/category/${value}`
   );
   const data = await res.json();
   const id = data.data;
   document.getElementById("btn").classList.remove("invisible");
   document.getElementById("btn2").classList.remove("invisible");
   /* Drawing part */
   if (value === 1005) {
     const err = document.createElement("div");
     const Video = document.getElementById("videoContain");
     Video.textContent = "";
     Video.classList.remove("grid");
     err.classList.add("flex", "flex-col", "text-center");
     err.innerHTML = `
     <div class="mx-auto mt-20">
           <img src="./resources/Icon.png" alt="" />
         </div>
         <p class="text-5xl">Oops!! Sorry, There is no <br />content here</p>
     `;
     Video.appendChild(err);
     document.getElementById("btn").classList.add("invisible");
     document.getElementById("btn2").classList.add("invisible");
   } else {
     viewData(id);
   }
   /* button work */
   document.getElementById("btn").addEventListener("click", function () {
     id.sort((s1, s2) => {
       s1 = parseFloat(s1.others.views);
       s2 = parseFloat(s2.others.views);
       const s3 = s2 - s1;
       return s3;
     });
     viewData(id);
   });
   /* Mobile view button work */
   document.getElementById("btn2").addEventListener("click", function () {
     id.sort((s1, s2) => {
       s1 = parseFloat(s1.others.views);
       s2 = parseFloat(s2.others.views);
       const s3 = s2 - s1;
       return s3;
     });
     viewData(id);
   });
 };
 
 /* function to show Video */
 function viewData(idNum) {
   const Video = document.getElementById("videoContain");
   Video.textContent = "";
   Video.classList.add("grid");
   idNum.forEach((element) => {
     const newVid = document.createElement("div");
     newVid.classList.add("card", "bg-base-100");
     element.authors.forEach((element2) => {
       newVid.innerHTML = `
       <div class="rounded-lg flex flex-col">
               <figure>
                 <img
                   class=" w-full lg:w-auto h-72"
                   src="${element.thumbnail}"
                   alt="Image not loaded"
                 />
                 </figure>
                 <p class="bg-[#b96b85] text-white text-xs text-center w-[122px] absolute top-[272px]" >${toHoursAndMinutes(
                   element.others.posted_date
                 )}</p>
             </div>
             <div class="card-normal p-0 flex flex-row mb-2 my-3">
               <div class="avatar w-10 h-10 mr-3">
                 <img class="rounded-full" src="${element2?.profile_picture}" />
               </div>
               <div class="mb-5">
                 <h2 class="card font-bold text-xl">${element?.title}</h2>
                 <p>${element2?.profile_name}<span class="ml-2" >${Verify(
         element2.verified
       )}</span></p>
                 <p>${element?.others.views} views</p>
               </div>
             </div>
       `;
       Video.appendChild(newVid);
     });
   });
 }
 // function to check verified
 const Verify = (isverify) => {
   if (isverify === true) {
     return '<i class="fa-solid fa-square-check" style="color: #005eff;"></i>';
   } else {
     return "";
   }
 };
 Videos(1000);
 category();
 /* converting seconds to hours minutes */
 function toHoursAndMinutes(totalSeconds) {
   if (totalSeconds === "") {
     return "";
   } else {
     const totalMinutes = Math.floor(totalSeconds / 60);
     // const seconds = totalSeconds % 60;
     const hours = Math.floor(totalMinutes / 60);
     const minutes = totalMinutes % 60;
     const total = hours + " hrs " + minutes + " min " + "ago";
     return total;
   }
 }