import fetchData from "./fetch.util";

export const getWords = async (filter = "") => {
  const path = "/words" + (filter && "?filter=") + filter;
  const data = await fetchData(path, "GET", true);
  return data;
};

export const postSearch = async (body) => {
  const data = await fetchData("/search", "POST", true, body);
  return data;
};

export const postSaveWord = async (body) => {
  const data = await fetchData("/save-word", "POST", true, body);
  return data;
};

export const deleteWord = async (body) => {
  const data = await fetchData("/delete-word", "DELETE", true, body);
  return data;
};

export const getFilterList = async () => {
  const data = await fetchData("/filters", "GET", true);
  return data;
};

export const postCreateFilter = async (body) => {
  const data = await fetchData("/create-filter", "POST", true, body);
  return data;
};

export const deleteFilter = async (body) => {
  const data = await fetchData("/delete-filter", "DELETE", true, body);
  return data;
};
