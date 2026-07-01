// ============================================
// Family Heritage v3.1
// Developed by Ranius Israel
// ============================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxc5k1nVP4Olrjnr27r2d_wjX6-I4eypqzQ35xgQ7d-kRA2GzOmGn_nNjuG0F6CgAxI/exec";

let members = [];
let filteredMembers = [];

// ----------------------------
// Load Members
// ----------------------------
async function loadMembers(){

    try{

        const response = await fetch(API_URL);

        members = await response.json();

        filteredMembers = [...members];

        showMembers();

    }
    catch(error){

        console.log(error);

        alert("Unable to load members.");

    }

}

// ----------------------------
// Show Members
// ----------------------------
function showMembers(){

    const list=document.getElementById("memberList");

    const count=document.getElementById("memberCount");

    if(!list) return;

    count.innerHTML=`${filteredMembers.length} Members`;

    let html="";

    filteredMembers.forEach(member=>{

        html+=`

<div class="member-card">

<img
class="member-photo"
src="https://cdn-icons-png.flaticon.com/512/149/149071.png">

<h2>${member.Name}</h2>

<span class="badge">

${member.Gender}

</span>

<p>

💼 ${member.Occupation || "-"}

</p>

<p>

🎂 ${member.DOB || "-"}

</p>

<button onclick="openProfile(${member.ID})">

View Profile

</button>

</div>

`;

    });

    list.innerHTML=html;

}

// ----------------------------
// Open Profile
// ----------------------------
function openProfile(id){

    localStorage.setItem("selectedMember",id);

    window.location="profile.html";

}

// ----------------------------
// Filters
// ----------------------------
function showAll(){

    filteredMembers=[...members];

    showMembers();

}

function showMale(){

    filteredMembers=members.filter(m=>m.Gender==="ஆண்");

    showMembers();

}

function showFemale(){

    filteredMembers=members.filter(m=>m.Gender==="பெண்");

    showMembers();

}

// ----------------------------
// Search
// ----------------------------
const search=document.getElementById("searchBox");

if(search){

search.addEventListener("input",()=>{

const keyword=search.value.toLowerCase();

filteredMembers=members.filter(member=>

(member.Name||"").toLowerCase().includes(keyword)

);

showMembers();

});

}

// ----------------------------

loadMembers();
