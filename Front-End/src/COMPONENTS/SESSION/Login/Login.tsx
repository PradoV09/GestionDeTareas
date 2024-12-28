import "./Login.css";

export const Login = (): JSX.Element => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Nombre de Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
