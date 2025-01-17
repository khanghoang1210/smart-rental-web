import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from './context/SocketContext.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <SocketProvider >
    <App />
    <Toaster closeButton duration={3000}/>
  </SocketProvider>
)
