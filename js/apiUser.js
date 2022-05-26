export const obtenerContactos= async()=>{
    // const urlContactos='https://reqres.in/api/users?page=2';
    const urlContactos='https://www.thesportsdb.com/api/v1/json/2/searchevents.php?e=Arsenal_vs_Chelsea'
    const resp=await fetch(urlContactos);
    const {data:contactos}=await resp.json();
    return contactos;
}
