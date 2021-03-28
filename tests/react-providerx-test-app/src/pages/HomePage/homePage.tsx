import { refresh, useProvider } from "react-providerx";
import { signOut } from "../../services/auth";
import { userDataPromiseProvider$ } from "../../shared/userData";

const SubComponent: React.FC = () => {
  const { isLoading, data: userData } = useProvider(userDataPromiseProvider$)
    if(isLoading) {
      return <div className="App">
        Loading...
      </div>
    }
    return (
      <div className="App">
        {(userData as any).email}
      </div>
    );
}

export const HomePage: React.FC = () => {
    const { isLoading, data: userData } = useProvider(userDataPromiseProvider$)
    if(isLoading) {
      return <div className="App">
        Loading...
      </div>
    }
    return (
      <div className="App">
        {(userData as any).email}
        <div className="col">
          <button onClick={() => refresh(userDataPromiseProvider$)}>
            Click to Refresh User Data
          </button>
          <button onClick={signOut}>
            Click to Sign Out
          </button>
        </div>
        <SubComponent />
      </div>
    );
}
