import './App.css';
import { ObservableProvider, refresh } from 'react-providerx'
import { from } from 'rxjs';
import { useProvider } from 'react-providerx'

const userProvider = new ObservableProvider(() => {
  const fetchData = async (url: string): Promise<any> => {
    const response = await fetch(url)
    const json = await response.json()
    return json
  }
  
  const randomUserId = Math.floor(Math.random() * 11) + 1
  const user$ = from(fetchData(`https://jsonplaceholder.typicode.com/users/${randomUserId}`))
  return user$
});



const App: React.FC = () => {
  const { isLoading, data } = useProvider(userProvider)
  if (isLoading) {
    return (
      <div className="App">
        Loading...
      </div>
    )
  }
  return (
    <div className="App">
      {data.username}
      <button onClick={() => refresh(userProvider)}>
        Click me to refresh user data
      </button>
    </div>
  );
};

export default App;
