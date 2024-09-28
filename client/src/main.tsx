import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

const PABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PABLE_KEY) {
  throw new Error("Missing publishable key");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
