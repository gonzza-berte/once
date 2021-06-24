

class Note {
    constructor(id, titulo, contenido){
    this.id = id;
    this.title = titulo;
    this.content = contenido;
    }
    
}

const formUno = document.getElementById('form-note');
const formDos = document.querySelector('#form-note-2');
const formTres = document.querySelector('#form-note-3');
const modalOne = document.querySelector('.modalOne');
const modalTwo = document.querySelector('.modalTwo');
const modalThree = document.querySelector('.modalThree');
const modalContent2 = document.querySelector("#modal2")
let notes = JSON.parse(localStorage.getItem('my notes')) || [] ;
let trash = JSON.parse(localStorage.getItem('trash')) || [] ;
const darkModeBtn = document.querySelector('#dark-mode-btn');
const cardNote = document.querySelector('#card-note');
const headerColor = document.querySelector('.header-color') 
const textMuted = document.querySelector('.textMuted');
const formCuatro = document.querySelector('#form-note-4');

// modo oscuro
let darkMode=()=>{ 
      darkModeBtn.addEventListener('click', ()=>{
      document.body.classList.toggle("darkMode");
      formUno.classList.toggle('cardDark');
      formDos.classList.toggle('cardDark');
      modalOne.classList.toggle('modalDark');
      modalTwo.classList.toggle('modalDark');
      modalThree.classList.toggle('modalDark');
      formUno.classList.toggle('cardDarkText');
      formDos.classList.toggle('cardDarkText');
      headerColor.classList.toggle('headerColor');
      darkModeBtn.classList.toggle('active');

      if(document.body.classList.value == "darkMode"){
        localStorage.setItem('Dark-Mode', 'True');
     }else{
        localStorage.setItem('Dark-Mode', 'False');
     }
    }) 
    if(localStorage.getItem('Dark-Mode')==='True'){
      document.body.classList.add("darkMode"); 
      formUno.classList.add('cardDark'); 
      formDos.classList.add('cardDark');
      modalTwo.classList.add('modalDark');
      modalThree.classList.add('modalDark');
      modalOne.classList.add('modalDark'); 
      formUno.classList.add('cardDarkText'); 
      formDos.classList.add('cardDarkText');
      headerColor.classList.add('headerColor'); 
      darkModeBtn.classList.add('active');
     }else{
      document.body.classList.remove("darkMode"); 
      formUno.classList.remove('cardDark'); 
      formDos.classList.remove('cardDark'); 
      modalTwo.classList.remove('modalDark');
      modalThree.classList.remove('modalDark');
      modalOne.classList.remove('modalDark');
      formUno.classList.remove('cardDarkText'); 
      formDos.classList.remove('cardDarkText'); 
      headerColor.classList.remove('headerColor');
      darkModeBtn.classList.remove('active');
     }
} 


    
 

$(document).ready(function(){
  $('#sub-title').hide()  
  $('#title-note').hover(function(){
    $('#sub-title').slideDown("3000").animate({opacity:"0.5"}).animate({opacity:"1"})
  })
})

let id= 0;
let getNote =()=>{
    const title = document.querySelector('.inputText-1');
    const titleText  = title.value;
    title.value ="";
    const content = document.querySelector('.inputText-2');
    const contentText  = content.value;
    content.value ="";
    let newNote = new Note(id++,titleText, contentText);
    notes.push(newNote);
     
    
    // Local Storage
    updateNotes(notes);
    // mostrar en documento 
    showNotes(); 
    return notes;
}



// actualizar local storage
let updateNotes = (notesU) =>{
  const noteString = JSON.stringify(notesU);
  localStorage.setItem('my notes', noteString); 
  localStorage.getItem("my notes");
  if(notesU.length===0){
    localStorage.removeItem('my notes');
  }

}

let updateTrash=(trashU)=>{
  const trashString = JSON.stringify(trashU);
  localStorage.setItem('trash', trashString); 
  localStorage.getItem("trash");
  if(trashU.length===0){
    localStorage.removeItem('trash');
  }
}
let recycleBin=()=>{
  /* DEBE FUNCIONAR CADA VEZ QUE SE HACE CLIC EN EL BOTON DELETE  */
  let trashNotes = localStorage.getItem('trash');
  let trashNotesArr = JSON.parse(trashNotes);
  let newTrash;
  const btnTrash = document.querySelector('#btnTrash');

  
  if(trashNotesArr==null){
    modalContent2.innerHTML +=`
            
        <div class="modal-header">
        <h5 class="modal-title modalTitle-two" id="exampleModalLabel"></h5>
      </div>
      <div class="modal-body modalBody-two">Papela vacía...
      </div>
      <div class="modal-footer">
      <i class='bx bx-reset' style="cursor:pointer; font-size: 1.5em"></i>
      <i class='bx bxs-trash' style="cursor:pointer; font-size: 1.5em"></i>
      </div>
      `;
    }
    else{
      trashNotesArr.reduce((allTags, trashNotesArr)=>{
        newTrash=[...allTags, ...trashNotesArr]
        return newTrash
      })
      console.log(newTrash)
      btnTrash.addEventListener('click', ()=>{
        for(let x=0; x < newTrash.length; x++){
          console.log("soy newtrash: "+ newTrash[x].title, newTrash[x].content)
        modalContent2.innerHTML +=`
            
            <div class="modal-header">
            <h5 class="modal-title modalTitle-two" id="exampleModalLabel">${newTrash[x].title}</h5>
          </div>
          <div class="modal-body modalBody-two">
          ${newTrash[x].content}
          </div>
          <div class="modal-footer">
          <i class='bx bx-reset' style="cursor:pointer; font-size: 1.5em"></i>
          <i class='bx bxs-trash' style="cursor:pointer; font-size: 1.5em"></i>
          </div>
          `;
        } 
      })
}

}
// Recuperar datos de local storage
let getLocalStorage = () =>{
      let obtMyNotes = localStorage.getItem('my notes');
      let myNotesArr = JSON.parse(obtMyNotes);
      if(myNotesArr==null){
        showNotes();
        }
        else{
          console.log(myNotesArr);

            formDos.innerHTML="";     
            for(let x=0; x < myNotesArr.length; x++){
            formDos.innerHTML +=` <div class="card" id="card-note">
            <h6 id="id" style="display: none;" >${notes[x].id}</h6>
            <h5 class="card-header "  >${myNotesArr[x].title}</h5>
            <div class="card-body">
            <div id='text'class="inputText-3 " >${myNotesArr[x].content}</div>  
            <div class="buttonsNote">
            <div class="buttons-newNote">
            <span class="material-icons buttons" id="editBtn" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Editar">mode</span> 
            <span type="submit" class="material-icons buttons" id="btn-delete" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar">delete</span>
            <span class="material-icons buttons" id="pdf" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="tooltip" data-bs-placement="bottom" title="PDF">picture_as_pdf</span>
            </div>
            </div>    
            </div> 
          </div>`;
          } 
          //modal
          let modalId = document.querySelector('#modalId')
    let myNoteStrg = localStorage.getItem("my notes");
    let myNotes = JSON.parse(myNoteStrg);
    let modalTitle = document.querySelector('.modalTitle-one');
    let modalContent = document.querySelector('.modalBody-one');
    const myNoteElements = document.querySelectorAll('#form-note-2 #card-note #editBtn');
      myNoteElements.forEach((myNoteElement, x) =>{
        myNoteElement.addEventListener('click', ()=>{
            modalId.innerHTML= myNotes[x].id;
            modalTitle.innerHTML=myNotes[x].title;
            modalContent.innerHTML=myNotes[x].content;
      });
    });
    //save changes
    let btnSave=document.querySelector('.btn-save');
        btnSave.addEventListener('click', ()=>{
          for(let i=0;i<notes.length;i++){
            if(notes[i].id == modalId.textContent && notes[i].title==modalTitle.textContent){
              notes[i].content=modalContent.textContent;
              updateNotes(notes);
              showNotes();
            }
          }
      });
      
            deleteNote();
        }
        generatePDF();
}


// Mostrar notas original
let showNotes =()=>{
  formDos.innerHTML="";
  for(let i=0; i<notes.length;i++){
      formDos.innerHTML +=` <div class="card btn-group" id="card-note"> 
      <header >
      <h6 id="id" style="display: none;">${notes[i].id}</h6>
      <h5 class="card-header ">${notes[i].title}</h5>
      </header>
      
      <div class="card-body">
      <div id='text'class="inputText-3 " >${notes[i].content}</div>      
      <div class="buttonsNote">
      <div class="buttons-newNote">
      <span class="material-icons buttons" id="editBtn" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Editar">mode</span> 
      <span type="submit" class="material-icons buttons" id="btn-delete" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar">delete</span>
      <span class="material-icons buttons" id="pdf" style="cursor:pointer; font-size: 1.5em" data-bs-toggle="tooltip" data-bs-placement="bottom" title="PDF">picture_as_pdf</span>
      </div>
        </div> 
      </div>
    </div>`;
    }
    
    //modal
    let modalId = document.querySelector('#modalId')
    let myNoteStrg = localStorage.getItem("my notes");
    let myNotes = JSON.parse(myNoteStrg);
    let modalTitle = document.querySelector('.modalTitle-one');
    let modalContent = document.querySelector('.modalBody-one');
    const myNoteElements = document.querySelectorAll('#form-note-2 #card-note #editBtn');
      myNoteElements.forEach((myNoteElement, x) =>{
        myNoteElement.addEventListener('click', ()=>{
            modalId.innerHTML= myNotes[x].id;
            modalTitle.innerHTML=myNotes[x].title;
            modalContent.innerHTML=myNotes[x].content;
      });
    });
    //save changes
    let btnSave=document.querySelector('.btn-save');
        btnSave.addEventListener('click', ()=>{
          for(let i=0;i<notes.length;i++){
            if(notes[i].id == modalId.textContent && notes[i].title==modalTitle.textContent){
              console.log(i)
              notes[i].content=modalContent.textContent;
              updateNotes(notes);
              showNotes();
            }
          }
      });
      deleteNote();
      generatePDF();

}

let deleteNote=()=>{
    //eliminar
    const noteElements = document.querySelectorAll('#form-note-2 #card-note #btn-delete');
    noteElements.forEach((noteElement, f) =>{
    noteElement.addEventListener('click', ()=>{
        noteElement.parentNode.removeChild(noteElement);
        trash.push(notes.splice(f, 1));
        updateTrash(trash);
        updateNotes(notes);
        showNotes();
        });
    });
}



//Generar PDF
let generatePDF=()=>{
  const config = {
    margin: 0.5,
    filename: 'document.pdf',
    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
  };
  const pdfElements = document.querySelectorAll('#form-note-2 #card-note #pdf');
    pdfElements.forEach((pdfElement, z) =>{
    pdfElement.addEventListener('click', ()=>{ 
      const pdf = `<h1>${notes[z].title}</h1>  ${notes[z].content}`;     
        html2pdf().set(config).from(pdf).save();
        });
    });
}


let clearNote = ()=>{
    const clearBtn = document.querySelector('#btn-note-2');
    clearBtn.addEventListener('click', ()=>{
      formUno.reset();
    })
} 
clearNote();


//AJAX
const aboutContent = document.querySelector('.modal-acercaDe');

$(document).ready(function(){
    $("#acercaDe").click(function(){
        $.get("JS/info.json", function(data, textStatus, jqXHR){
          console.log(data)
          console.log(textStatus)
          console.log(jqXHR)
          displayJson(data)          
        })
        const displayJson =(jsonObject)=>{
          jsonObject.forEach(jsonItem=>{
            let version = jsonItem.version
            let diseñado = jsonItem.diseñado
            let año = jsonItem.año
            let mail = jsonItem.mail
            let tel = jsonItem.telefono

            aboutContent.innerHTML=`Versión: ${version} <br>
                                     Diseñado por: ${diseñado} <br>
                                     ${año} <br> <br>
                                     <h5>Contactenos</h5>
                                     e-mail: ${mail}<br>
                                     Teléfono: ${tel} `;
            
          })
        }
    })
})

/* SIDEBAR */

document.addEventListener("DOMContentLoaded", function(event) {

  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)
  
  if(toggle && nav && bodypd && headerpd){
  toggle.addEventListener('click', ()=>{
  
  nav.classList.toggle('show')

  toggle.classList.toggle('bx-x')

  bodypd.classList.toggle('body-pd')
 
  headerpd.classList.toggle('body-pd')
  })
  }
  }
  
  showNavbar('header-toggle','nav-bar','body-pd','header')
  
  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')
  
  function colorLink(){
  if(linkColor){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
  }
  }
  linkColor.forEach(l=> l.addEventListener('click', colorLink))
  });





const Main =()=>{
  formUno.onsubmit = (e) =>{ 
    e.preventDefault(); 
    getNote();   
    clearNote();   
}
  getLocalStorage();
  darkMode(); 
  formDos.onsubmit=(e)=>{
    e.preventDefault();
  }
  formTres.onsubmit =(f)=>{
    f.preventDefault();
  } 
  
}


Main();



























    

    


