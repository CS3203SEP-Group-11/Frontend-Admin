import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, createContext, useContext, useMemo } from 'react'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

// Theme Context for dark mode
const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const themeValue = useMemo(() => ({
    isDarkMode,
    toggleTheme
  }), [isDarkMode])

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Router>
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App