import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use((req: any) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       // @ts-ignore: already check not null
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

export const signIn = (formData: any) => API.post("/auth/signin", formData);
export const signUp = (formData: any) => API.post("/auth/signup", formData);
