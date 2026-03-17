import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Dashboard from './pages/Dashboard'
import Planning from './pages/Planning'
import Evaluation from './pages/Evaluation'
import Logbook from './pages/Logbook'
import Students from './pages/Students'
import Settings from './pages/Settings'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Verde MEP
      light: '#60AD5E',
      dark: '#005005'
    },
    secondary: {
      main: '#1976D2',
      light: '#63A4FF',
      dark: '#004BA0'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 260 }}>
          <Header />
          <main style={{ padding: 24 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/evaluation" element={<Evaluation />} />
              <Route path="/logbook" element={<Logbook />} />
              <Route path="/students" element={<Students />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
