import "./CreateAccount.css";

export const CreateAccount = (): JSX.Element => {
  return (
    <div>
      <h1>Crear Cuenta</h1>
      <input
        type="email"
        placeholder="Correo  Electronico"
        id="email"
        name="email"
      ></input>
      <input type="text" placeholder="Nombre de Usuario" />
      <input type="password" placeholder="Contraseña" />
      <input type="password" placeholder="Confirma la contraseña" />
      <button type="submit">Crear Cuenta</button>
    </div>
  );
};
