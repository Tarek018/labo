import { Component, createEffect, createSignal, } from 'solid-js';
import qrcode from 'qrcode'; 
import { useNavigate } from "solid-app-router";


/* import { matricule } from "./signup";
import { QrCode } from '@suid/icons-material'; */
import { QrCode } from '@suid/icons-material';

const Qrcode: Component = () => {

    let  [qrCodee,setqrCode]=createSignal('')
    let data:string=localStorage.getItem('id') as string;
    const navigate=useNavigate();
    createEffect(async()=>{
        if(localStorage.getItem('id')==null){
            navigate('/');
            return;
        }

        //  qrCode = qrcode.toDataURL(x); 
         setqrCode(await qrcode.toDataURL(data))   

    })
    return (
        <div>
            <img src={qrCodee()} class='qrcode' style='position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%, -50%);
                                        height: 350px;"'/>
            <h2></h2>
        </div>
    )
}

export default Qrcode;