import { signInWithGoogle } from "../../services/auth";

export const LoginPage: React.FC = () => {
    return (
      <div className="App">
          Not Logged In
          <button onClick={signInWithGoogle}>
              Click to Sign In With Google
          </button>
      </div>
    );
}
