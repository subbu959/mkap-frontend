import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// profile = {
// {
//   "message": "Login successful",
//   "tokens": {
//       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWRmN2RiZWFjNThlMjk2YjUzNTQ4NCIsImVtYWlsIjoiamFuZS5kb2UxMjM0NUBnbWFpbC5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTczOTQ1NjM2MSwiZXhwIjoxNzM5NDU5OTYxfQ.RgeenUesmdA40j_6cVJKcTwZUVIVxXotEPBp40cED7I",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWRmN2RiZWFjNThlMjk2YjUzNTQ4NCIsImVtYWlsIjoiamFuZS5kb2UxMjM0NUBnbWFpbC5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTczOTQ1NjM2MSwiZXhwIjoxNzQwMDYxMTYxfQ.ZmRN1IjOgwnprRyHdfGwl3sBRucn8NUIQTchuDAwH6k"
//   },
//   "user": {
//       "id": "67adf7dbeac58e296b535484",
//       "email": "jane.doe12345@gmail.com",
//       "role": "superAdmin"
//   }
// }
// }

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      // @ts-ignore: already check not null
      // JSON.parse(localStorage.getItem("profile")).token
      JSON.parse(localStorage.getItem("profile")).tokens.accessToken
    }`;
  }
  return req;
});

export const createUser = (formData: any) => API.post("/users", formData);
export const getUsers = () => API.get("/users");
export const getUser = (id: string) => API.get(`/users/${id}`);
export const updateUser = (id: string, formData: any) => API.patch(`/users/${id}`, formData);
// export const deleteUser = (id: string) => API.delete(`/users/${id}`);