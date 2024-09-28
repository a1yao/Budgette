import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Dashboard } from './pages/dashboard'
import { Auth } from './pages/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FinancialRecordsProvider } from './contexts/financialRecordContext'


function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<FinancialRecordsProvider><Dashboard /></FinancialRecordsProvider>}/>
          <Route path="/auth" element={<Auth />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
