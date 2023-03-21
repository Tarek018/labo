import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa'
import {  } from "solid-js";



export default defineConfig({
  plugins: [solidPlugin(
    
  ), VitePWA({ registerType: 'autoUpdate', injectRegister: 'auto',workbox: {
    clientsClaim: true,
    skipWaiting: true
  }, devOptions: {
    enabled: true
  } })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['./solid-js',"./solid-js/web","./solid-js/store"],
    },
  },
  
  
});

