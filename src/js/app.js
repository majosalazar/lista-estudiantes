firebase.initializeApp({
  apiKey: "AIzaSyDeCtZ0HOFrLQVqcfEMYFwqQ2tMOpRMEQw",
  authDomain: "lista-estudiantes.firebaseapp.com",
  projectId: "lista-estudiantes"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//agregar estudiante 
function nuevaEstudiante () {
  //guarda nombre alumna
  let nombre = document.getElementById('nombre').value;
  
  db.collection("estudiante").add({
    nombre: nombre, 
    skills: null
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    //limpiar input nombre
    document.getElementById('nombre').value = ' ';
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};


//ver tarjeta de cada alumna ingresada
let estudiantes = document.getElementById('mostrarEstudiantes');

db.collection("estudiantes").onSnapshot((querySnapshot) => {
  mostrarEstudiantes.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().nombre}`);
    mostrarEstudiantes.innerHTML += `
    <div class="row">
      <div class="col-2"> 
        <img src="" alt="">
      </div>
      <div class="col-2">
        <p>${doc.data().nombre}</p>
      </div>
      <div class="col-8">
        <p>Skills</p>
        <div id="mostrarSkills"></div>
        <a href="#!" data-toggle="modal" data-target="#exampleModal"">+ agregar</a>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1"         role="dialog" aria-labelledby="exampleModalLabel"         aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new skills</h5>
                <button type="button" class="close"         data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                Separate multiple skill with commas.
                <br>
                <textarea id="nuevaSkills"></textarea>
                
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" onclick="agregarSkills()">Add</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  });
});

//agregar skills a estudiante 
function agregarSkills () {
  //guarda nombre alumna
  let skill = document.getElementById('nuevaSkills').value;
  
  db.collection("skills").add({
    skills: skill
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    db.collection("skills").onSnapshot((querySnapshot) => {
      mostrarSkills.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().skill}`);
        mostrarEstudiantes.innerHTML += `
        <button type="button" class="btn btn-primary btn-sm">${doc.data().skill} x</button>
    
        
        `
      });
    });
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};

//ver tarjeta de cada alumna ingresada
let skillsEstudiantes = document.getElementById('mostrarSkills');


