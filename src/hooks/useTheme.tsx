import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextValue | null>(null)

function initialTheme(): Theme {
  try {
    return localStorage.getItem('vg-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
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
