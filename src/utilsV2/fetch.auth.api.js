import fetchData from "./fetch.util";

export const postLogin = async (body) => {
  const data = await fetchData("/login", "POST", false, body);
  return data;
};

export const postSignup = async (body) => {
  const data = await fetchData("/signup", "POST", false, body);
  return data;
};

export const getRefreshToken = async () => {
  const data = await fetchData("/refresh-token", "GET", true);
  return data;
};
