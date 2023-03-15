import { Component, createSignal } from 'solid-js';
import Axios from "axios";
import { useNavigate } from "solid-app-router";
import Swal from 'sweetalert2'



const loginagent: Component = () => {
    const navigate=useNavigate();
    const [infagent,setInfagent]=createSignal({
        user:"",
        pass:""
    })
    function login() {
        console.log(infagent());
        
        Axios.post("http://127.0.0.1:8080/agent/login",JSON.stringify(infagent()))
        .then( (response)=> {
            localStorage.setItem("authagent",JSON.stringify(response.data));
             navigate('/agentscan')
      })
      .catch( (error)=> {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'les information est incorrect',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
      });

    }
    return (
        <div>
            <div class='container'>
            <div class="form">
                <h1 class='header'>Inscription</h1>
                <input type="text" class='matricule'  placeholder='votre matricule' oninput={async (e)=>{
                await setInfagent({...infagent(),user:e.currentTarget.value})
                }} /><br />
                <input type="password" class='matricule'  placeholder='votre matricule' oninput={async (e)=>{
                    await setInfagent({...infagent(),pass:e.currentTarget.value})
                }} />
                <button class='sign' onClick={login}>Sign up</button>
            </div>
        </div>
        </div>
    )
}

export default loginagent;