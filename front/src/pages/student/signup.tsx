import { Component, createSignal } from 'solid-js';
import { useNavigate } from "solid-app-router";
import Axios from "axios";
import './signup.css';


export const [matricule,setregi_number]=createSignal('');


const signup: Component = () => {

    

    const navigate=useNavigate();

    function signup(){
        console.log(matricule());
        Axios.post('http://127.0.0.1:8080/student/login',JSON.stringify(matricule()))
          .then( (response)=> {
            console.log(response);
            if(response.status ==200)
            {
                console.log("mrigla");
                localStorage.setItem("auth",JSON.stringify(response.data));
                localStorage.setItem("studentId",matricule())
                navigate('/studentqrcode')
            }
          })
          .catch( (error)=> {
            console.log(error);
            alert("aaaa")
          });
    }

    return (
        <div class='container'>
            <div class="form">
                <h1 class='header'>Inscription</h1>
                <input type="text" class='matricule'  placeholder='votre matricule' oninput={(e)=>{
                    setregi_number(e.currentTarget.value);   
                }} /><br />
                <button class='sign' onClick={signup}>Sign up</button>
            </div>
        </div>
    )
}

export default signup;