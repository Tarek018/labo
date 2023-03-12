import { Component, createEffect, onMount  } from 'solid-js';
import QrScannerr from 'qr-scanner/qr-scanner.umd.min.js';
import QrScanner from 'qr-scanner';
import  useRef  from 'solid-js';
//import { useRef } from 'solid-js';





const teacherdash: Component = () => {
    // To enforce the use of the new api with detailed scan results, call the constructor with an options object, see below.
    //const [videoRef] = useRef() as HTMLVideoElement;
    
   // let videoRef:any;
    //const [videoRef] = useRef({})
    // const [videoRef] = useRef<HTMLVideoElement>();

    // const qrScanner = new QrScanner(
    //     videoElem,
    //     result => console.log('decoded qr code:', result),
    //     // No options provided. This will use the old api and is deprecated in the current version until next major version.
    // );
    let videoElem:any;
    
    onMount(() => {
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
    .then(result => console.log(result))
    .catch(error => console.log(error || 'No QR code found.'));
   }
   
    
    // For backwards compatibility, omitting the options object will currently use the old api, returning scan results as
    // simple strings. This old api will be removed in the next major release, by which point the options object is then
    // also not required anymore to enable the new api.
    
    
    return (
        <div>
            <h1>hey</h1>
            <button onClick={scan}>Scan</button>
            <video ref={videoElem}></video>

        </div>
    )
}

export default teacherdash;