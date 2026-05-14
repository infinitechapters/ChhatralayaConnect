// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_URL + "api",
// });

// API.interceptors.request.use((req) => {

//  const token = localStorage.getItem("accessToken");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://chhatralayaconnect.onrender.com/api",
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;

