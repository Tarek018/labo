import { Component } from 'solid-js';
import { Button } from "@suid/material";
import { useNavigate } from "solid-app-router";


const home: Component = () => {
    const navigate=useNavigate();
    return (
        <div class='container' style='display: flex; flex-direction: column; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'>
            <Button variant="contained" style='margin: 10px auto; width:150px' onClick={()=>{
                navigate('/loginadmin')
            }}>Admin</Button>
            <Button variant="contained" style='margin: 10px auto; width:150px' onClick={()=>{
                navigate('/login')
            }}>Etudiant</Button>
            <Button variant="contained" style='margin: 10px auto; width:150px' onClick={()=>{
                navigate('/login')
            }}>Employee</Button>
            <Button variant="contained" style='margin: 10px auto; width:150px' onClick={()=>{
                navigate('/login')
            }}>Visiteur</Button>
             <Button variant="contained" style='margin: 10px auto; width:150px' onClick={()=>{
                navigate('/loginagent')
            }}>Agent</Button>
           
        </div>
    )
}

export default home;