import TopPage from './subpages/TopPage'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-container">
          <TopPage />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App
