document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

let selected;
let selectedID;
let color;
let active;
let steder;
let pos;

async function runProgram() {
  // Hent JSON
  //------------------------------------------------------------------------------------

  const json = await fetch("poi.json");
  steder = await json.json();

  // 1. Load svg map
  //------------------------------------------------------------------------------------

  let mySvg = await fetch("kort.svg");
  let cph = await mySvg.text();

  // Vis kort
  //------------------------------------------

  document.querySelector("#map").innerHTML = cph;

  //Skjul ruter
  //-----------------------------------------------

  document.querySelector("#rute1").style.display = "none";
  document.querySelector("#rute2").style.display = "none";
  document.querySelector("#rute3").style.display = "none";
  document.querySelector("#rute4").style.display = "none";

  // 3. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------

  document.querySelector("#points").addEventListener("click", (e) => {
    clicked(e);
  });
}

//function clicked
//--------------------------------------------------------------------

function clicked(obj) {
  // fjern css animation, så den kan animere ind
  //----------------------------------------------

  document.querySelector("#info").classList.remove("vis");
  document.querySelector("#rute1").classList.remove("animer-rute");
  document.querySelector("#rute2").classList.remove("animer-rute");
  document.querySelector("#rute3").classList.remove("animer-rute");
  document.querySelector("#rute4").classList.remove("animer-rute");

  // a. find det klikkede element
  //----------------------------------------------

  selected = obj.target;

  // find elementets position
  //--------------------------------------

  pos = selected.getBoundingClientRect();
  document.querySelector("#info").style.top = pos.bottom + "px";
  document.querySelector("#info").style.left = pos.right + "px";
  document.querySelector("#info").style.display = "block";
  document.querySelector("#rute1").style.display = "block";
  document.querySelector("#rute2").style.display = "block";
  document.querySelector("#rute3").style.display = "block";
  document.querySelector("#rute4").style.display = "block";

  // b. find det klikkede elementets ID
  //---------------------------------------------

  selectedID = selected.getAttribute("id");

  // c. find  det klikkede elements fillfarve
  //---------------------------------------------

  color = selected.getAttribute("fill");

  // d. vis infobokse
  //--------------------------------------------

  steder.forEach((sted) => {
    if (sted.poi == selectedID) {
      document.querySelector("#info h1").textContent = sted.overskrift;
      document.querySelector("#info p").textContent = sted.tekst;
      document.querySelector("#info img").src =
        "/billeder/" + sted.billede + ".jpg";
      //tilføj class med css animation
      document.querySelector("#info").classList.add("vis");
      if (sted.poi == "punkt1") {
        document.querySelector("#rute2").classList.add("animer-rute");
      }
      if (sted.poi == "punkt2") {
        document.querySelector("#rute3").classList.add("animer-rute");
      }
      if (sted.poi == "punkt3") {
        document.querySelector("#rute4").classList.add("animer-rute");
      }
      if (sted.poi == "punkt4") {
        document.querySelector("#rute1").classList.add("animer-rute");
      }
    }
  });

  // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
  //------------------------------------------------------------------------------------

  if (active != undefined) {
    active.setAttribute("fill", color);
  }

  //gør det klikkede til det aktive
  //-------------------------------------------------------------------------

  active = selected;

  //skift farve på det valgte
  //-------------------------------------------------------------------------

  if (color == "#4c0e48") {
    selected.setAttribute("fill", "#b34fac");
  }

  //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
  //--------------------------------------------------------------------------
  else {
    selected.setAttribute("fill", "#4c0e48");
    document.querySelector("#info").style.display = "none";
    document.querySelector("#rute1").style.display = "none";
    document.querySelector("#rute2").style.display = "none";
    document.querySelector("#rute3").style.display = "none";
    document.querySelector("#rute4").style.display = "none";
  }
}
