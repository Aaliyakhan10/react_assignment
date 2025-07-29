import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-blue/theme.css';  // or any other theme
import 'primereact/resources/primereact.min.css';                // core components
import 'primeicons/primeicons.css';  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <PrimeReactProvider>
         <App/>
        </PrimeReactProvider>
  </StrictMode>,
)
