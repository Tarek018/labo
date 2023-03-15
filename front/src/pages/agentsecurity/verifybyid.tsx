import Axios from 'axios';
import { Component, createEffect, createSignal } from 'solid-js';
import Swal from 'sweetalert2';
import { useNavigate } from "solid-app-router";




const verifybyid: Component = () => {
    const [id,setid]=createSignal('');
    const navigate=useNavigate();
    createEffect(async()=>{
        let token=await localStorage.getItem('authagent')
        if(token ==null){
            navigate('/loginagent');
            return;
        }
    })

    function verify(){
        console.log(id());
        let token=localStorage.getItem('authagent') as string
        Axios.post('http://127.0.0.1:8080/agent/verifybyid',JSON.stringify(id()))
        .then( (response)=> {
            if(response.status == 200){
                Swal.fire(
                    'Good job!',
                    'Autoriser',
                    'success'
                  )
            }
      })
      .catch( (error)=> {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'Non Autorisé',
            icon: 'error',
            confirmButtonText: 'Cool'
          })      });        
    }

    return (
        <div>
            <div class='container'>
            <div class="form">
                <h1 class='header'>Inscription</h1>
                <input type="text" class='matricule'  placeholder='votre matricule' oninput={async (e)=>{
                    await setid(e.currentTarget.value)
                }} /><br />
                <button class='sign' onClick={verify}>verifier</button>
            </div>
        </div>
        </div>
    )
}

export default verifybyid;