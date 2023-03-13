import Axios from "axios";
import { useNavigate, useParams } from "solid-app-router";
import { Component, createSignal } from 'solid-js';


export const checkAuth = async (params:any) => {

    const [auth, setauth] = createSignal(false);

    //const params=useParams()

    console.log("tarek");
    
    await Axios.post(`http://127.0.0.1:8080/student/teacher/${params.user}`)
        .then( (response)=> {
          console.log(response);
          if(response.status ==200)
          {
              setauth(true);
          }
        })
        .catch( (error)=> {
          setauth(false)
        });

        return auth();
}
