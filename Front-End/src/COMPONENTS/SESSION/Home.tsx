import { CreateAccount } from "./CreateAccount/CreateAccount.tsx";
import { Login } from "./Login/Login.tsx";
import './Home.css'; 

export const Home = (): JSX.Element => {
  return (
    <div className="home-container">
      <h1>BIENVENIDO</h1>
      <p>Organiza hoy, logra mañana</p>
      <div className="session-container">
        <Login />
        <CreateAccount />
      </div>
    </div>
  );
};
