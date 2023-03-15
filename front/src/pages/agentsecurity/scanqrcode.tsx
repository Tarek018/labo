import { Component, createEffect, createSignal, onMount } from 'solid-js';
import QrScanner from 'qr-scanner';
import { useNavigate } from "solid-app-router";
import { version } from 'vite';
import Axios from 'axios';
import Swal from 'sweetalert2'





const scanqrcode: Component = () => {
    createEffect(async()=>{
        let token=await localStorage.getItem('authagent')
        if(token ==null){
            navigate('/loginagent');
            return;
        }
    })
    let videoElem:any;
    const [id,setid]=createSignal('');
    const navigate=useNavigate();
    onMount( () => {

        //videoElem = new HTMLVideoElement;
        const qrScanner = new QrScanner(
            videoElem,
            result => console.log('decoded qr code:', result),
            { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
            );
        qrScanner.start();
    });
    function verifybyid(){
        navigate('/verifybyid');
    }
    function scan(){
        QrScanner.scanImage(videoElem)
        .then(result => setid(result))
        .catch(error => console.log(error || 'No QR code found.'));
        Axios.post('',JSON.stringify(id()))
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
            <video ref={videoElem} style='height: 289px; width: 269px; position: relative; left: 45px; top: -55px;'></video>
            <button onClick={scan}>Scanne</button><br />
            <button onClick={verifybyid}>verifier par le matricule</button>
        </div>
    )
}

export default scanqrcode;