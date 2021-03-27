import { useProvider } from "react-providerx";
import { signOut } from "../../services/auth";
import { authStateProvider$ } from "../../shared/authState";

export const HomePage: React.FC = () => {
    const { isLoading, data: user } = useProvider(authStateProvider$)
    if(isLoading) {
      return <div className="App">
        Loading...
      </div>
    }
    return (
      <div className="App">
        {(user as any).displayName}
        <button onClick={signOut}>
          Click to Sign Out
        </button>
      </div>
    );
}
