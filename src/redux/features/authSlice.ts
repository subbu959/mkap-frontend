import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/authApi";

export const signIn = createAsyncThunk("auth/signIn", async (
  { formData, router  }: { formData: any; router: any;  },
  { rejectWithValue }
) => {
  const response = await api.signIn(formData);
  console.log(response.data);
  return response.data;

});

export const signUp = createAsyncThunk("auth/signUp", async (
    { formData, router  }: { formData: any; router: any;  },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.signUp(formData);
      console.log(response.data);
      router.push("/login");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  });


export const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      error: "",
      loading: false,
    },
    reducers: {
      setUser: (state: any, action: any) => {
        state.user = action.payload;
      },
      setLogout: (state: any, action: any) => {
        localStorage.clear();
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(signIn.pending, (state: any, action: any) => {
        state.loading = true;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      });
      builder.addCase(signIn.fulfilled, (state: any, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      });
      builder.addCase(signIn.rejected, (state: any, action: any) => {
        if (action.payload) {
          state.loading = false;
          state.error = action.payload.message;
        } else {
          state.error = action.error;
        }
      });
      builder.addCase(signUp.pending, (state: any, action: any) => {
        state.loading = true;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      });
      builder.addCase(signUp.fulfilled, (state: any, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      });
      builder.addCase(signUp.rejected, (state: any, action: any) => {
        if (action.payload) {
          state.loading = false;
          state.error = action.payload.message;
        } else {
          state.error = action.error;
        }
      });
    },
  });
  
  export const { setUser, setLogout } = authSlice.actions;
  
  export default authSlice.reducer;
  

