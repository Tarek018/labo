import { Component, createSignal } from 'solid-js';
import Axios from "axios";
import Swal from 'sweetalert2'
import { Button } from "@suid/material";

import { useNavigate } from "solid-app-router";





const Permanent_users_form: Component = () => {
    const navigate=useNavigate();
    const [id,setid]=createSignal('');



    function signup(){
        console.log(id());
        Axios.post('http://127.0.0.1:8080/login',JSON.stringify(id()))
          .then( (response)=> {
                localStorage.setItem("id",response.data.id)
                 navigate('/createqrcode');
                 
          })
          .catch( (error)=> {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'les information est incorect',
                icon: 'error',
                confirmButtonText: 'Cool'
              });          });
    }


    return (
        <div class='container'>
            <img src="./src/assets/no_backround_nb.png" class='img' alt="" />
            <div class="form">
                <h1 class='header'>Inscription</h1>
                <input type="text" class='matricule'  placeholder='votre matricule' oninput={async (e)=>{
                    await setid(e.currentTarget.value)
                }} /><br />
                <Button variant="contained" class='button-insecrption' onClick={signup}>Criee QrCode</Button>
            </div>
        </div>
    )
}

export default Permanent_users_form;