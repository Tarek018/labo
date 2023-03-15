import { Component, createSignal } from 'solid-js';
import  Axios  from 'axios';
import { useNavigate } from "solid-app-router";
import Swal from 'sweetalert2';
import { Button } from "@suid/material";




const loginadmin: Component = () => {
    const navigate=useNavigate();
    const [form,setForm]=createSignal({
        user:"",
        pass:""
    })
    async function senddata(){
        await Axios.post("http://127.0.0.1:8080/admin/login",JSON.stringify(form()))
        .then( (response)=> {
            localStorage.setItem("auth",JSON.stringify(response.data));
            navigate('/admindash')
      })
      .catch( (error)=> {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'les information est incorect',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
      });
        
    }
    return (
        <div class='admin-login '>
            <input type="text" placeholder='user' oninput={async(e)=>{
                await setForm({...form(),user:e.currentTarget.value})    
            }}/>
            <input type="password" placeholder='password' oninput={async(e)=>{
                await setForm({...form(),pass:e.currentTarget.value})    
            }} />
            <Button variant="contained" class='button-login-admin' onClick={senddata}>Criee QrCode</Button>
        </div>
    )
}

export default loginadmin;