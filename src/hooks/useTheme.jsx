import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
function initialTheme() {
  try {
    return localStorage.getItem('vg-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('vg-theme', theme)
    } catch {
      /* storage bloqueado */
    }
  }, [theme])
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme precisa de ThemeProvider')
  return value
}
