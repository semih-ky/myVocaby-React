import { useAuth } from "../../contextV2/AuthProvider";

const Logout = () => {
  const auth = useAuth();

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <div className="navbar-item">
      <div className="buttons">
        <button onClick={logoutHandler} className="button is-danger">
          <strong>Logout</strong>
        </button>
      </div>
    </div>
  );
};
export default Logout;
