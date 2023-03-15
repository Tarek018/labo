import Axios  from 'axios';
import { create } from 'qrcode';
import { Component, createEffect, createSignal } from 'solid-js';
import { useNavigate } from "solid-app-router";
import * as XLSX from 'xlsx';


const admindash: Component = () => {
  const navigate=useNavigate();
    const [xl,setxl]=createSignal([]);

    createEffect(async()=>{
      let token=await localStorage.getItem('auth');
      if(!token){
          navigate('/loginadmin');
          return;
      }
  })

    
    function onFileSelected(event: any): void {
        
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = ( e) => {
          let data:any = new Uint8Array(fileReader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const headers:any = jsonData.shift();
          data = jsonData.map((row:any) => {
            const obj:any = {};
            row.forEach((cell:any, i:number) => {
              obj[headers[i]] = cell;
            });          
            setxl(obj);
            console.log(xl());
            Axios.post('http://127.0.0.1:8080/admin/sava-data',JSON.stringify(xl()))
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });

            
            return obj;
          });
    
        };
    
        fileReader.readAsArrayBuffer(file);
      }
      
    return (
        <div>
            <input onChange={onFileSelected}  type="file" class="file" id="excel-file" name="excel-file" accept=".xls,.xlsx" />
            {/* <button onClick={savefile}>Send</button> */}
        </div>
    )
}

export default admindash;