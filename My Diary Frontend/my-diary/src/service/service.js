import axios from "axios";
import url from "url";

const baseUrl = ""; //default localhost -> package.json proxy

const api = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthTokenToServiceInstance = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    api.defaults.headers.common.Authorization = null;
  }
};

async function makeRequest(method, pathname, data, options = {}) {
  const body = method === "get" || !data ? {} : { data };
  const params = Object.keys(options)
    .map((key) => key + "=" + options[key])
    .join("&");

  const requestUrl = `${pathname}?${params}`;
  const reqObj = {
    method,
    url: requestUrl,
    ...body,
    ...options,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.request(reqObj);
      resolve(res.data);
    } catch (error) {
      if (error.response) {
        reject(error?.response?.data);
      }
      reject(error);
    }
  });
}

const Service = {
  get(path, options) {
    return makeRequest("GET", path, null, options);
  },

  post(path, data, options) {
    return makeRequest("POST", path, data, options);
  },

  put(path, data, options) {
    return makeRequest("PUT", path, data, options);
  },

  delete(path, data, options) {
    return makeRequest("DELETE", path, data, options);
  },
};

export default Service;
