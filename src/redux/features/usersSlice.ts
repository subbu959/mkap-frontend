import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/userApi";


export const createUser = createAsyncThunk(
    "users/createUser",
    async (
      {
        updatedUserData,
        router,
      }: { updatedUserData: any; router: any;  },
      { rejectWithValue }
    ) => {
      try {
        const response: any = await api.createUser(updatedUserData);
        router.push("/admin-home");
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const response: any = await api.getUsers();
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || "An error occurred");
      }
    }
  );

  export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (
      {
        id,
        updatedUserData,
        router,
      }: { id: string; updatedUserData: any; router: any },
      { rejectWithValue }
    ) => {
      try {
        const response: any = await api.updateUser(updatedUserData, id);
        router.push("/");
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  
const UserSlice = createSlice({
    name: "User",
    initialState: {
      User: {},
      Users: [],
      userUsers: [],
      tagUsers: [],
      relatedUsers: [],
      currentPage: 1,
      numberOfPages: null,
      error: "",
      loading: false,
    },
    reducers: {
      setCurrentPage: (state: any, action: any) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder: any) => {
      builder.addCase(createUser.pending, (state: any, action: any) => {
        state.loading = true;
      });
      builder.addCase(createUser.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.Users = [action.payload];
      });
      builder.addCase(createUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
      builder.addCase(getUsers.pending, (state: any, action: any) => {
        state.loading = true;
      });
      builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.Users = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      });
      builder.addCase(getUsers.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
      builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userUsers = state.userUsers.map((item: any) =>
            item._id === id ? action.payload : item
          );
          state.Users = state.Users.map((item: any) =>
            item._id === id ? action.payload : item
          );
        }
      });
      builder.addCase(updateUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    },
  });
  
  export const { setCurrentPage } = UserSlice.actions;
  
  export default UserSlice.reducer;
  