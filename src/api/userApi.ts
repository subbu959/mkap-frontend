import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      // @ts-ignore: already check not null
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createUser = (formData: any) => API.post("/users", formData);
export const getUsers = () => API.get("/users");
export const getUser = (id: string) => API.get(`/users/${id}`);
export const updateUser = (id: string, formData: any) => API.patch(`/users/${id}`, formData);
// export const deleteUser = (id: string) => API.delete(`/users/${id}`);