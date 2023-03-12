import { Component, createEffect, createSignal, } from 'solid-js';
import qrcode from 'qrcode'; 
import { useNavigate } from "solid-app-router";


/* import { matricule } from "./signup";
import { QrCode } from '@suid/icons-material'; */
import { matricule } from "./signup";
import { QrCode } from '@suid/icons-material';

const Qrcode: Component = () => {

    let  [qrCodee,setqrCode]=createSignal('')
    let x:string=localStorage.getItem('studentId') as string;
    const navigate=useNavigate();
    createEffect(async()=>{
        if(localStorage.getItem('auth')==null){
            navigate('/');
            return;
        }

        //  qrCode = qrcode.toDataURL(x); 
         setqrCode(await qrcode.toDataURL(x))   

    })
    return (
        <div>
            <img src={qrCodee()} />
            <h2></h2>
        </div>
    )
}

export default Qrcode;