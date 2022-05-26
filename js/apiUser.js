export const obtenerHinchas= async()=>{
    const urlHinchas='https://reqres.in/api/users?page=2';
    const resp=await fetch(urlHinchas);
    const {data:hinchas}=await resp.json();
    return hinchas;
}
