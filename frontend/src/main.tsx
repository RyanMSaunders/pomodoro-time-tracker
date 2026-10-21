import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Greeting } from './components/Greeting'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Greeting name="Pomo" />
  </StrictMode>,
)
