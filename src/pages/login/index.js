import AuthPageLayout from "../../components/AuthPageLayout";

const Login = () => {
  return (
    <AuthPageLayout
      infoMsg="If you don't have an account please "
      link="/signup"
      linkName="Sign Up!"
    >
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input className="input is-danger" type="text" />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
        <p className="help is-danger">Help Text</p>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="password" />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        <p className="help is-danger">help text</p>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link">Login</button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default Login;
