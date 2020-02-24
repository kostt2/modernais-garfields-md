const jautajumu_skaits = 5;
const atbilzu_variantu_skaits = 6;
let gar = vgk.length;
let atbildes = [];
let jaut_nr;
let pareiza_atbilde;
let pareizo_skaits;
var laikss;
var laiksb;
let nr = []; //nodefinē viendimensiju masīvu
for (let i = 0; i < 7; i++) {
  nr[i] = []; //nodefinē masīvam otru dimensiju; nr[i][0] - glabā jautājuma numuru un tur pat arī pareizo atbildi
}

function jaunaSpele() {
  const g = new Galvaspilsetas();
  this.textblock.innerHTML = ""; //Uzklikšķinot Sākt spēli, novāc visu veco
  g.inicializet();
}

function maniTop10(){
    var tabheadmytop = ["Jautājumu daudzums","Atbildes","Datums un laiks","Spēles ilgums","Rezultāts"]
    let s = {"uname":h2.innerHTML};
    console.log(s);
    const url = '/mytop';
    let request = new Request (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(s)
    });
    fetch(request)
      .then((resp)=>resp.json())
      .then((data)=>{
        console.log(data.mytopten);
        var myTopTen = data.mytopten;
        var col = [];
        for (var i = 0; i < myTopTen.length; i++) {
            for (var key in myTopTen[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        var table = document.createElement("table");
        var tr = table.insertRow(-1);
        for (var i = 0; i < tabheadmytop.length; i++) { // tabulas galvene
            var th = document.createElement("th");
            th.innerHTML = tabheadmytop[i];
            tr.appendChild(th);
        }
        for (var i = 0; i < myTopTen.length && i < 10; i++) { // cik rindas tabulaa
            tr = table.insertRow(-1);
            for (var j = 1; j < col.length; j++) { //kolonnas
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myTopTen[i][col[j]];
            }
        }
        var textblock = document.getElementById("MansTop10");
        this.textblock.innerHTML = "<h1>Mani Top 10</h1>";
        this.textblock.appendChild(table);
     });;
}


function Top10(){
  var tabheadalltop = ["Lietotājs","Jautājumu daudzums","Atbildes","Datums un laiks","Spēles ilgums","Rezultāts"]
  let s = {"uname":h2.innerHTML};
  console.log(s);
  const url = '/alltop';
  let request = new Request (url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(s)
  });
  fetch(request)
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log(data.alltopten);
      var allTopTen = data.alltopten;
      var col = [];
      for (var i = 0; i < allTopTen.length; i++) {
          for (var key in allTopTen[i]) {
              if (col.indexOf(key) === -1) {
                  col.push(key);
              }
          }
      }
      var table = document.createElement("table");
      var tr = table.insertRow(-1);
      for (var i = 0; i < tabheadalltop.length; i++) { // tabulas galvene
          var th = document.createElement("th");
          th.innerHTML = tabheadalltop[i];
          tr.appendChild(th);
      }
      for (var i = 0; i < 10; i++) { // cik rindas tabulaa
          tr = table.insertRow(-1);
          for (var j = 0; j < col.length; j++) { //kolonnas
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = allTopTen[i][col[j]];
          }
      }
      var textblock = document.getElementById("MansTop10");
      this.textblock.innerHTML = "<h1>Kopīgs Top 10</h1>";
      this.textblock.appendChild(table);
   });;
}



function ieiet_visiem(){
  this.leftBox = document.getElementById("left-sidebar");
  this.leftBox.innerHTML = "";
  this.divUzruna = document.createElement("div");
  this.divUzruna.setAttribute("id","uzruna");
  this.leftBox.appendChild(this.divUzruna);
  this.h2 = document.createElement("h2");
  this.h2.setAttribute("id","h2");
  this.leftBox.appendChild(this.h2);

  this.jauna_spele = document.createElement("BUTTON");
  this.jauna_spele.setAttribute("class", "poga");
  this.jauna_spele.innerHTML = "Jauna spēle";
  this.jauna_spele.onclick =  () => jaunaSpele();
  this.leftBox.appendChild(this.jauna_spele);

  this.mani_top10 = document.createElement("BUTTON");
  this.mani_top10.setAttribute("class", "poga");
  this.mani_top10.innerHTML = "Mani TOP 10";
  this.mani_top10.onclick = () => maniTop10();
  this.leftBox.appendChild(this.mani_top10);

  this.top10 = document.createElement("BUTTON");
  this.top10.setAttribute("class", "poga");
  this.top10.innerHTML = "TOP 10";
  this.top10.onclick = () => Top10();
  this.leftBox.appendChild(this.top10);

  this.beigt = document.createElement("BUTTON");
  this.beigt.setAttribute("class", "poga");
  this.beigt.innerHTML = "Beigt";
  this.beigt.onclick = () => location.reload();
  this.leftBox.appendChild(this.beigt);
  
  jaunaSpele();
}

function neregistrejoties(){
  var LietotajaVards = "Viesis";
  ieiet_visiem();
  h2.innerHTML = LietotajaVards;
}

function ieiet(){
  var LietotajaVards = document.getElementById("uname").value;
  ieiet_visiem();
  h2.innerHTML = LietotajaVards;
}

function ieiet2(){
  var LietotajaVards = document.getElementById("runame").value;
  ieiet_visiem();
  h2.innerHTML = LietotajaVards;
}

function login(){
  let lgndata = new Object();
  lgndata.uname = document.getElementById('uname').value;
  lgndata.pwd =  document.getElementById('psw').value ;
    const xhr = new XMLHttpRequest(),
    method = 'POST',
    url = '/yn';
      xhr.open(method, url, true);
      xhr.onreadystatechange = function () {
      if(xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText == 'JAA'){
         return ieiet();
         }
         return alert("Jūsu lietotājvārds/parole nederīgi!!!")
      }
    }
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader("Content-type", "application/json, charset=utf-8");
xhr.send(JSON.stringify(lgndata));
}

function lgnpsscheck(){
  let parole1 = document.getElementById("rpsw").value;
  let parole2 = document.getElementById("rpsw2").value;
  if(parole1!==parole2){
    alert("Paroles nesakrīt :(");
  }     
  else{
    //Pārbauda, vai tāds Lietotāja vārds ir brīvs...
      let regchkdata = new Object();
      regchkdata.runame = document.getElementById('runame').value;
      const xhr = new XMLHttpRequest(),
      method = 'POST',
      url = '/lgnchk';
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText == 'NESAKRIIT'){
           return registracija();
           }
           return alert("Jūsu lietotājvārds jau lieto cits spēlētājs!!!")
        }
      }
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("Content-type", "application/json, charset=utf-8");
  xhr.send(JSON.stringify(regchkdata));
    }
  }

function registracija(){
  let regdata = new Object();
  regdata.reguname = document.getElementById('runame').value;
  regdata.regpwd =  document.getElementById('rpsw').value;
  const xhrr = new XMLHttpRequest(),
    method = 'POST',
    url = '/rgstr';
      xhrr.open(method, url, true);
      xhrr.onreadystatechange = function () {
      if(xhrr.readyState == 4 && xhrr.status == 200) {
        if (xhrr.responseText == 'IZDEVAS'){
          alert("Reģistrācija izdevas! \n Varāt spēlēt kā "+ regdata.reguname);
          return ieiet2();
         }
         return alert("Viss ir slikti!!! \n Jānospiež F5")
       }
    }
xhrr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhrr.setRequestHeader("Content-type", "application/json, charset=utf-8");
xhrr.send(JSON.stringify(regdata));
}

class Galvaspilsetas {
  constructor() {
    this.izvele = null;
  }

  inicializet() {
    laikss = new Date().getTime();

    this.textblock = document.getElementById("textblock");
    this.textblock.innerHTML = "";
    if (this.textblock) {
      this.divProgres = document.createElement("div");
      this.divProgres.setAttribute("id", "progres");
      this.textblock.appendChild(this.divProgres);

      this.divPareizi = document.createElement("div");
      this.divPareizi.setAttribute("class", "pareizi");
      this.textblock.appendChild(this.divPareizi);

      this.divJautajums = document.createElement("div");
      this.divJautajums.setAttribute("id", "jautajums");
      this.textblock.appendChild(this.divJautajums);

      this.divAtbilzuVar = document.createElement("div");
      this.divAtbilzuVar.setAttribute("id", "atbilzu_var");

      this.divKarogi = document.createElement("img");
      this.divKarogi.setAttribute("id", "karogi");

      jaut_nr = 0;
      pareizo_skaits = 0;
      this.jaunsJautajums();
    }
  }

  jaunsJautajums() {
    this.divAtbilzuVar.innerHTML = ""; //Noklikšķinot Atbildēt novāc veco jautājumu
    this.textblock.appendChild(this.divAtbilzuVar);

    this.Random_jautajumi();

    this.divProgres.innerHTML =
      "Tavs pašreizējais rezultāts ir " +
      pareizo_skaits +
      " no " +
      jautajumu_skaits +
      " iespējamajiem. </br></br>";
    this.divJautajums.innerHTML = "<b>" + (jaut_nr + 1) + ". " + vgk[nr[jaut_nr][0]][1] + "</b></br>";
    this.divKarogi.setAttribute("src", vgk[nr[jaut_nr][0]][3]);
    this.divJautajums.appendChild(this.divKarogi);
    //Funkcija Random_jautajumi strādā tā, ka pareizā atbildē vienmēr ir 0.pozīcijā
    //Šeit ģenerē pareizās atbildes atrašanās vietu starp random izvēlētajām galvaspilsētām:
    pareiza_atbilde = Math.floor(Math.random() * atbilzu_variantu_skaits);
    let tmp;
    tmp = nr[jaut_nr][0];
    nr[jaut_nr][0] = nr[jaut_nr][pareiza_atbilde];
    nr[jaut_nr][pareiza_atbilde] = tmp;

    for (let ii = 0; ii < atbilzu_variantu_skaits; ii++) {
      let str1 = "";
      this.radioVar = document.createElement("INPUT");
      this.radioLabel = document.createElement("LABEL");
      this.radioVar.setAttribute("type", "radio");
      this.radioVar.setAttribute("name", "r1");
      this.radioVar.setAttribute("value", ii);
      this.radioVar.setAttribute("id", 'radio${ii}');
      this.radioVar.onchange = () => (this.izvele = ii);
      this.radioLabel.setAttribute("for", 'radio${ii}');
      str1 = vgk[nr[jaut_nr][ii]][2];
      str1 = str1.concat("</br>");
      this.radioLabel.innerHTML = str1;
      this.divAtbilzuVar.appendChild(this.radioVar);
      this.divAtbilzuVar.appendChild(this.radioLabel);
    }
    this.atbildet = document.createElement("BUTTON");
    this.atbildet.setAttribute("class", "poga");
    this.atbildet.innerHTML = "Atbildēt";
    this.atbildet.onclick = () => this.atbildets();
    this.divAtbilzuVar.appendChild(this.atbildet);
  }

  atbildets() {
    if (this.izvele === null) {
      alert("Izvēlieties galvaspilsētu!");
    } else {
      jaut_nr++;
      if (this.izvele === pareiza_atbilde) {
        pareizo_skaits++;
      }
      if (jaut_nr < jautajumu_skaits) {
        this.jaunsJautajums();
      } else {
        this.raadiit_punktus();
      }
      this.izvele = null;
    }
  }

  raadiit_punktus() {
    this.textblock.innerHTML = "";
    this.textblock = document.getElementById("textblock");
    if (this.textblock) {
      this.divRezultats = document.createElement("div");
      this.divRezultats.setAttribute("id", "rezultats");
      this.textblock.appendChild(this.divRezultats);
      this.divRezultats.innerHTML =
        "Punkti " +
        pareizo_skaits +
        " no " +
        jautajumu_skaits +
        ". </br> <img src='static/images/congratulation.jpg'>";
      statistika()
      }
    }


  Random_jautajumi() {
    let sk;
    let ir = [],
      irr = [];
    for (let i = 0; i < gar; i++) {
      ir.push(false); //jautājumu numuriem
      irr.push(false); //atbilžu variantu numuriem
    }
    for (let i = 0; i < jautajumu_skaits; i++) {
      do {
        sk = Math.floor(Math.random() * gar);
      } while (ir[sk]); //kamēr random skaitlis ir aizņemts, ģenerē nākamo
      nr[i][0] = sk; //ieraksta masīvā izvēlēto jautājuma numuru un PAREIZĀS galvaspilsētas numurs ir tieši tas pats
      ir[sk] = true;
      for (let j = 0; j < gar; j++) {
        //  Šis domāts atbilžu variantiem
        irr[j] = false;
      }
      irr[sk] = true;
      //Ģenerē nepareizo galvaspilsētu numurus:
      for (let j = 1; j < atbilzu_variantu_skaits; j++) {
        do {
          sk = Math.floor(Math.random() * gar);
        } while (irr[sk]);
        nr[i][j] = sk;
        irr[sk] = true;
      }
    }
  }
}



function statistika(){
  let statok = pareizo_skaits;
  let jautno = jautajumu_skaits;
  let datumslaiks = new Date().toLocaleString('lv', {Hours: 'numeric', Minutes: 'long', Secundes: 'numeric'});
  var laiksb = new Date().getTime();
  let splslks = Math.round((laiksb - laikss)/1000);
  let trsltts = Math.round(statok*50000/splslks);
  let needLength =  5;
  trsltts = String(trsltts);
  while (trsltts.length < needLength) {
    trsltts = "0" + trsltts;
  }
  let rsltts = trsltts
  console.log (rsltts)
   
  
  let sttdata = new Object();
    sttdata.suname = h2.innerText;
    sttdata.jautno = jautno;
    sttdata.statok = statok;
    sttdata.datumslaiks = datumslaiks;
    sttdata.splslks = splslks;
    sttdata.rsltts = rsltts;
  
const xhrs = new XMLHttpRequest(),
  method = 'POST',
  url = '/sttstk';
    xhrs.open(method, url, true);
    xhrs.onreadystatechange = function () {
    if(xhrs.readyState == 4 && xhrs.status == 200) {
      if (xhrs.responseText == 'STATOK'){
        return console.log ("Rezultāti veiksmīgi saglabāti!!!");
//        return reiting();
       }
       return console.log ("Viss ir slikti!!! \n Jānospiež F5")
       }
    }
xhrs.setRequestHeader("Access-Control-Allow-Origin", "*");
xhrs.setRequestHeader("Content-type", "application/json, charset=utf-8");
xhrs.send(JSON.stringify(sttdata));
}
