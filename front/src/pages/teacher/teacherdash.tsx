import { Component, createEffect, createResource, createSignal, onMount  } from 'solid-js';
import QrScannerr from 'qr-scanner/qr-scanner.umd.min.js';
import QrScanner from 'qr-scanner';
import  useRef  from 'solid-js';
import { useParams } from 'solid-app-router';
import { useNavigate } from "solid-app-router";
import Axios from "axios";
//import { useRef } from 'solid-js';
import Pouchdb from "pouchdb";





const teacherdash: Component = () => {
    let videoElem:any;
    const [idstudent,setidstudent]=createSignal();
    const navigate=useNavigate();


    const params = useParams() ;


    onMount(() => {

         Axios.post(`http://127.0.0.1:8080/student/teacher/${params.user}`)
         .then( (response)=> {
           console.log(response);
         })
         .catch( (error)=> {
           console.log(error);
           navigate('/');
           return;
         });
  

        console.log(params.user);
        //videoElem = new HTMLVideoElement;
    const qrScanner = new QrScanner(
        videoElem,
        result => console.log('decoded qr code:', result),
        { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
    );
    qrScanner.start();
  

   })
   
   function scan(){
    QrScanner.scanImage(videoElem)
    .then(result => setidstudent(result))
    .catch(error => console.log(error || 'No QR code found.'));
    
   }
   createEffect(()=>{
    Axios.get('')
   })
   
   
    
    // For backwards compatibility, omitting the options object will currently use the old api, returning scan results as
    // simple strings. This old api will be removed in the next major release, by which point the options object is then
    // also not required anymore to enable the new api.
    
    
    return (
        <div>
            <h1>hey</h1>
            <video ref={videoElem} style='height: 289px; width: 269px; position: relative; left: 45px; top: -55px;'></video>
            <button onClick={scan} style='position: relative;
                                          top: -87px;
                                          background-color: #c8c8cb;
                                          padding: 10px;
                                          border: none;
                                          border-radius: 10px;'
            >Scan</button>
        </div>
    )
}

export default teacherdash;