const isLoggedInFunct = () => {
  console.log("Look at the user is logged in");

  const tkn = localStorage.getItem("token");
  const expTime = localStorage.getItem("expTime");

  if (!tkn || !expTime) return false;

  const currTime = Date.now();

  if (currTime > expTime) return false;

  return true;
};
export default isLoggedInFunct;
