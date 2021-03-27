import './App.css';
import { useProvider } from 'react-providerx'
import { authStateProvider$ } from './shared/authState';
import { HomePage } from './pages/HomePage/homePage';
import { LoginPage } from './pages/LoginPage/loginPage';



const App: React.FC = () => {
  const { isLoading, data} = useProvider(authStateProvider$)
  if (isLoading) {
    return (
      <div className="App">
        Loading...
      </div>
    )
  }
  return data === 'not-logged-in' ? <LoginPage /> : <HomePage />
};

export default App;
