'use strict';
import { Contacto } from "../js/Contacto.js";
import {obtenerHinchas} from '../js/apiUser.js';

const contactosData = 'crud-contacto';
let contactos = [];
const contenedorAlerta = document.querySelector('#contenedorAlerta');
let timeoutId = 0;


const generateId = () => {
  if (localStorage.getItem('crud-contactos-id')) {
    let id = +localStorage.getItem('crud-contactos-id');
    localStorage.setItem('crud-contactos-id', ++id);
    return id;
  } else {
    localStorage.setItem('crud-contactos-id', 1);
    return 1;
  }
};



const showAlert = (type, content) => {
  clearTimeout(timeoutId);
  contenedorAlerta.classList.remove('bg-primary');
  contenedorAlerta.classList.remove('bg-success');
  contenedorAlerta.classList.remove('bg-danger');
  contenedorAlerta.classList.add(type);
  contenedorAlerta.innerHTML = content;
  timeoutId = setTimeout(() => {
    contenedorAlerta.innerHTML = '';
  }, 5000);
};


const getFormData = () => {
  const documentFormContacto = document.forms['formContacto'];
  const id = documentFormContacto['id'].value;
  const nombre = documentFormContacto['nombre'].value;
  const celular = documentFormContacto['celular'].value;
  const mensaje = documentFormContacto['mensaje'].value;
  const urlImagen = documentFormContacto['urlImagen'].value;

  return ({ id, nombre, celular, mensaje, urlImagen});
};


const validateForm = () => {
  const documentFormContacto = document.forms['formContacto'];
  const id = documentFormContacto['id'].value;
  const nombre = documentFormContacto['nombre'].value;
  const celular = documentFormContacto['celular'].value;
  const mensaje = documentFormContacto['mensaje'].value;
  const urlImagen = documentFormContacto['urlImagen'].value;

  return [nombre.trim(), celular.trim(), mensaje.trim(), urlImagen.trim()].includes('');
};


const resetForm = () => {
  const documentFormContacto = document.forms['formContacto'];
  documentFormContacto['id'].value = '';
  documentFormContacto['nombre'].value = '';
  documentFormContacto['celular'].value = '';
  documentFormContacto['mensaje'].value = '';
  documentFormContacto['urlImagen'].value = '';
};

// import { allData } from "../utils/allData.js";
// import models from "./models.js";
// import { Contacto } from "../js/Contacto.js";
// const documentReady2 = () => {
//   models(allData);
// }


// let contactos = [
//   new Contacto('Jose', '954495883', 'Saludos doy mi voto alianza'),
//   new Contacto('Oscar', '989595884', 'Saludos mi equipo es la U'),
//   new Contacto('Mario', '966595884', 'Saludos doy para melgar'),
//   new Contacto('Elmer', '966595884', 'Saludos doy para melgar')
// ];
// const contenedorAlerta = document.querySelector('#contenedorAlerta');
// let timeoutId = 0;

// const showAlert = (type, content) => {
//   clearTimeout(timeoutId);
//   contenedorAlerta.classList.remove('bg-primary');
//   contenedorAlerta.classList.remove('bg-success');
//   contenedorAlerta.classList.remove('bg-danger');
//   switch (type) {
//     case 'primary':
//       contenedorAlerta.classList.add('bg-primary');
//       break;
//     case 'success':
//       contenedorAlerta.classList.add('bg-success');
//       break;
//     case 'danger':
//       contenedorAlerta.classList.add('bg-danger');
//       break;
//     default:
//       contenedorAlerta.classList.add('bg-primary');
//       break;
//   }
//   contenedorAlerta.innerHTML = content;
//   timeoutId = setTimeout(() => {
//     contenedorAlerta.innerHTML = '';
//   }, 5000);
// };

// const getFormData = () => {
//   const documentFormContacto = document.forms['formContacto'];
//   const id = documentFormContacto['id'].value;
//   const nombre = documentFormContacto['nombre'].value;
//   const celular = documentFormContacto['celular'].value;
//   const mensaje = documentFormContacto['mensaje'].value;

//   return ({ id, nombre, celular, mensaje});
// };

// const validateForm = () => {
//   const documentFormContacto = document.forms['formContacto'];
//   const nombre = documentFormContacto['nombre'].value;
//   const celular = documentFormContacto['celular'].value;
//   const mensaje = documentFormContacto['mensaje'].value;

//   return [nombre.trim(), celular.trim(), mensaje.trim()].includes('');
// };

// const resetForm = () => {
//   const documentFormContacto = document.forms['formContacto'];
//   documentFormContacto['id'].value = '';
//   documentFormContacto['nombre'].value = '';
//   documentFormContacto['celular'].value = '';
//   documentFormContacto['mensaje'].value = '';
// };



const createContact = () => {
  const { nombre, celular, mensaje,urlImagen } = getFormData();
  if (validateForm()) {
    showAlert('bg-danger', 'Completar todos los campos');
  } else {
    contactos = [...contactos, new Contacto(generateId(), nombre, celular, mensaje, urlImagen)];
    localStorage.setItem(contactosData, JSON.stringify(contactos));
    resetForm();
    readContacts();
    showAlert('bg-primary', 'Registro creado');
  }
};


const readContacts = () => {
  const tBodyContacto = document.querySelector('#tBodyContacto');
  tBodyContacto.innerHTML = '';
  contactos.forEach((element) => {
    const { _id, _nombre, _celular, _mensaje, _urlImagen} = element;

    const fragment = document.createDocumentFragment();
    const tableRow = document.createElement('tr');

    const tHId = document.createElement('th');
    tHId.textContent = _id;

    const tDNombre = document.createElement('td');
    tDNombre.textContent = _nombre;

    const tDCelular = document.createElement('td');
    tDCelular.textContent = _celular;

    const tDMensaje = document.createElement('td');
    tDMensaje.textContent = _mensaje;

    const tDUrlImage = document.createElement('td');
    tDUrlImage.style.maxWidth = '128px'


    const tDUrlImageImg = document.createElement('img');
    tDUrlImageImg.setAttribute('src', _urlImagen);
    tDUrlImageImg.setAttribute('alt', _nombre);
    tDUrlImageImg.classList.add('img-fluid');

    tDUrlImage.appendChild(tDUrlImageImg);

    const tDActions = document.createElement('td');

    const tDButtonRead = document.createElement('button');
    tDButtonRead.textContent = '✏';
    tDButtonRead.addEventListener('click', () => readContact(_id));
    tDButtonRead.classList.add('bg-success');
    tDButtonRead.classList.add('rounded');
    tDButtonRead.classList.add('border-0');
    tDButtonRead.classList.add('mx-1');
    tDButtonRead.classList.add('p-0');

    const tDButtonDelete = document.createElement('button');
    tDButtonDelete.textContent = '🗑';
    tDButtonDelete.addEventListener('click', () => deleteContact(_id));
    tDButtonDelete.classList.add('bg-danger');
    tDButtonDelete.classList.add('rounded');
    tDButtonDelete.classList.add('border-0');
    tDButtonDelete.classList.add('mx-1');
    tDButtonDelete.classList.add('p-0');

    tDActions.appendChild(tDButtonRead);
    tDActions.appendChild(tDButtonDelete);

    tableRow.appendChild(tHId);
    tableRow.appendChild(tDNombre);
    tableRow.appendChild(tDCelular);
    tableRow.appendChild(tDMensaje);
    tableRow.appendChild(tDUrlImage);
    tableRow.appendChild(tDActions);
    fragment.appendChild(tableRow);
    tBodyContacto.appendChild(fragment);
  });
  showAlert('bg-primary', 'Registros leídos');
};


const readContact = (id) => {
  const documentFormContacto = document.querySelector('#formContacto');
  const formTitle = document.querySelector('#formTitle');
  const formButton = document.querySelector('#formButton');

  const contacto = contactos.find((element) => {
    return element._id === id;
  });
  const { _id, _nombre, _celular, _mensaje, _urlImagen} = contacto;

  formTitle.innerHTML = 'Editar contacto';
  formButton.innerHTML = 'Editar';
  documentFormContacto['id'].value = _id;
  documentFormContacto['nombre'].value = _nombre;
  documentFormContacto['celular'].value = _celular;
  documentFormContacto['mensaje'].value = _mensaje;
    documentFormContacto['urlImagen'].value = _urlImagen;
  showAlert('bg-primary', 'Registro leído');
};



const updateContact = () => {
  const { id, nombre, celular, mensaje,urlImagen } = getFormData();
  const formTitle = document.querySelector('#formTitle');
  const formButton = document.querySelector('#formButton');

  if (validateForm()) {
    showAlert('bg-danger', 'Completar todos los campos');
  } else {
    contactos = contactos.map((element) => {
      if (element._id !== +id) {
        return element;
      } else {
        element._nombre = nombre;
        element._celular = celular;
        element._mensaje = mensaje;
        element._urlImagen = urlImagen;
        return element;
      }
    });
    localStorage.setItem(contactosData, JSON.stringify(contactos));
    resetForm();
    formTitle.innerHTML = 'Crear contacto';
    formButton.innerHTML = 'Crear';
    readContacts();
    showAlert('bg-success', 'Registro actualizado');
  }
};

const deleteContact = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Está seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, elimínalo!',
    cancelButtonText: '¡No, cancélalo!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      contactos = contactos.filter((element) => {
        return element._id !== id;
      });
      localStorage.setItem(contactosData, JSON.stringify(contactos));
      readContacts();
      showAlert('bg-danger', 'Registro eliminado');
      swalWithBootstrapButtons.fire(
        '¡Eliminado!',
        'Tu registro ha sido eliminado.',
        'success'
      );
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu registro está seguro',
        'error'
      );
    }
  });
};

const documentReady = () => {
  const formContacto = document.querySelector('#formContacto');

  const submitContacto = (e) => {
    e.preventDefault();
    const id = document.getElementById('formId').value;
    if (id === '') {
      createContact();
    } else {
      updateContact();
    }
  };

  if (localStorage.getItem(contactosData)) {
    contactos = JSON.parse(localStorage.getItem(contactosData));
    readContacts();
  } else {
    localStorage.setItem(contactosData, JSON.stringify(contactos));
  }

  formContacto.addEventListener('submit', submitContacto);





// const createContact = () => {
//   const { nombre, celular,mensaje } = getFormData();
//   if (validateForm()) {
//     showAlert('danger', 'Completar todos los campos');
//   } else {
//     contactos = [...contactos, new Contacto(nombre,celular, mensaje)];
//     resetForm();
//     readContact();
//     showAlert('primary', 'Registro creado');
//   }
// };





// const readContact = () => {
//   const tBodyContacto = document.querySelector('#tBodyContacto');
//   tBodyContacto.innerHTML = '';

//   contactos.forEach((element) => {
//     const { id, nombre, celular, mensaje} = element;
//     tBodyContacto.innerHTML += `
//       <tr>
//         <th>${id}</th>
//         <td>${nombre}</td>
//         <td>${celular})}</td>
//         <td>${mensaje}</td>
//         <td>
//           <button
//             class="bg-success rounded border-0 p-2"
//             onclick="readContactos(${id})"
//           >
//             ✏
//           </button>
//           <button
//             class="bg-danger rounded border-0 p-2"
//             onclick="deleteContact(${id})"
//           >
//             🗑
//           </button>
//         </td>
//       </tr>
//     `
//   });
//   showAlert('primary', 'Registros leídos');
// };

// const readContactos = (contactId) => {
//   const documentFormContacto = document.querySelector('#formContacto');
//   const formTitle = document.querySelector('#formTitle');
//   const formButton = document.querySelector('#formButton');

//   const contacto = contactos.find((element) => {
//     return element.id === contactId;
//   });
//   const { id, nombre, celular, mensaje} = contacto;

//   formTitle.innerHTML = 'Editar contacto';
//   formButton.innerHTML = 'Editar';
//   documentFormContacto['id'].value = id;
//   documentFormContacto['nombre'].value = nombre;
//   documentFormContacto['celular'].value = celular;
//   documentFormContacto['mensaje'].value = mensaje;
//   showAlert('primary', 'Registro leído');
// };

// const updateContact = () => {
//   const { id, nombre, celular, mensaje} = getFormData();
//   const formTitle = document.querySelector('#formTitle');
//   const formButton = document.querySelector('#formButton');

//   if (validateForm()) {
//     showAlert('danger', 'Completar todos los campos');
//   } else {
//     contactos = contactos.map((element) => {
//       if (element.id !== +id) {
//         return element;
//       } else {
//         element.nombre = nombre;
//         element.celular = celular;
//         element.mensaje = mensaje;
//         return element;
//       }
//     });

//     resetForm();
//     formTitle.innerHTML = 'Crear contacto';
//     formButton.innerHTML = 'Crear';
//     readContact();
//     showAlert('success', 'Registro actualizado');
//   }
// };

// const deleteContact = (id) => {
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success mx-2',
//       cancelButton: 'btn btn-danger mx-2'
//     },
//     buttonsStyling: false
//   });

//   swalWithBootstrapButtons.fire({
//     title: '¿Está seguro?',
//     text: "¡No podrás revertir esto!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: '¡Sí, elimínalo!',
//     cancelButtonText: '¡No, cancélalo!',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.isConfirmed) {
//       contactos = contactos.filter((element) => {
//         return element.id !== id;
//       });
//       readContact();
//       showAlert('danger', 'Registro eliminado');
//       swalWithBootstrapButtons.fire(
//         '¡Eliminado!',
//         'Tu registro ha sido eliminado.',
//         'success'
//       );
//     } else if (
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire(
//         'Cancelado',
//         'Tu registro está seguro',
//         'error'
//       );
//     }
//   });
// };

// const documentReady = () => {
//   const formContacto = document.querySelector('#formContacto');

//   const submitContact = (e) => {
//     e.preventDefault();
//     const id = document.getElementById('formId').value;
//     if (id === '') {
//       createContact();
//     } else {
//       updateContact();
//     }
//   };

//   readContact();
//   formContacto.addEventListener('submit', submitContact);
};


const apiWeb=()=>{
  const tBodyApi = document.querySelector('#tBodyApi');
  obtenerHinchas().then( res => {
      res.forEach((element) => {

        const { id, email, first_name, last_name,avatar } = element;

        const fragment = document.createDocumentFragment();
        const tableRow = document.createElement('tr');

        const tHId = document.createElement('th');
        tHId.textContent = id;

        
        const tDUrlImage = document.createElement('td');
        tDUrlImage.style.maxWidth = '128px'

        const tDUrlImageImg = document.createElement('img');
        tDUrlImageImg.setAttribute('src', avatar);
        tDUrlImageImg.setAttribute('alt', first_name);
        tDUrlImageImg.classList.add('img-fluid');

        const tDEmail = document.createElement('td');
        tDEmail.textContent = email;

        const tDNombres = document.createElement('td');
        tDNombres.textContent = first_name;

        const tDApellidos = document.createElement('td');
        tDApellidos.textContent = last_name;


        
        tableRow.appendChild(tHId);
        tDUrlImage.appendChild(tDUrlImageImg);
        tableRow.appendChild(tDEmail);
        tableRow.appendChild(tDNombres);
        tableRow.appendChild(tDApellidos);
        tableRow.appendChild(tDUrlImage);
        fragment.appendChild(tableRow);
        tBodyApi.appendChild(fragment);

      }); 
  })
};

apiWeb();
console.log(apiWeb());



document.addEventListener('DOMContentLoaded', documentReady);
