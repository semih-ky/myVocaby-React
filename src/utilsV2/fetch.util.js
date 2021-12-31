const HOST = "http://localhost:5000/api/v1";

async function fetchData(path = "", method = "GET", token = false, body = "") {
  const TOKEN = localStorage.getItem("token");
  const url = HOST + path;
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) headers.append("Authorization", "Bearer " + TOKEN);

  let init = {
    method,
    headers,
  };

  if (body) {
    init = {
      ...init,
      body: JSON.stringify(body),
    };
  }

  let res;
  try {
    res = await fetch(url, init);
  } catch (err) {
    const error = new Error("Something went wrong!");
    error.statusCode = 500;
    throw error;
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const error = new Error("Something went wrong!");
    error.statusCode = 500;
    throw error;
  }

  let data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong!");
    error.statusCode = res.status;
    throw error;
  }

  return data;
}
export default fetchData;
