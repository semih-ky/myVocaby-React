export const fetchData = async ({
  path = "",
  method = "",
  token = "",
  body = "",
}) => {
  const url = "http://localhost:5000/api/v1" + path;
  const headers = new Headers({ "Content-Type": "application/json" });

  if (token) headers.append("Authorization", "Bearer " + token);

  let init = {
    method,
    headers,
  };

  if (method.toLowerCase() !== "get") {
    init = {
      ...init,
      body: body && JSON.stringify(body),
    };
  }

  return await fetch(url, init);
};

export const regexValidator = (value, regex) => {
  let keyPress = value.split("")[value.length - 1];
  return regex.test(keyPress);
};

export const trimmedValue = (val) => val.trim().split(" ").join("");
