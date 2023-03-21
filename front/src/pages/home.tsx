import { Component, onMount } from 'solid-js';
import { Button } from "@suid/material";
import { useNavigate } from "solid-app-router";
import PouchDB from "pouchdb-browser";



const home: Component = () => {
    const navigate=useNavigate();
    let isInstantiated!: boolean;
    var laboDB:any;
    onMount(() => {
                  laboDB = new PouchDB("labo");

    })
    //     if (!isInstantiated) {
    //         laboDB = new PouchDB("labo");
    //         isInstantiated = true;
    //       }
    //         const remoteDatabase = new PouchDB("http://admin:admin@localhost:5984/labo");
        
    //           laboDB
    //             .sync(remoteDatabase, {
    //               live: true,
    //               retry: true
    //             })
    //             .on("change", (change: any) => {
    //               laboDB.emit(change);
    //             })
    //             .on("error", (error: any) => {
    //               console.error(JSON.stringify(error));
    //             });
    // })

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