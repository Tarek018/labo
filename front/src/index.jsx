/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "solid-app-router";

import './index.css';
import App from './App';



// check if user is teacher
// const url_string = window.location.href;
// const url = new URL(url_string);
// const user = url.searchParams.get("user");
// if (Boolean(user))
//   localStorage.setItem("user", user);

/////////////

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}



render(() => 
<>        
<Router>
  <App />
</Router>
        </>
, root);
