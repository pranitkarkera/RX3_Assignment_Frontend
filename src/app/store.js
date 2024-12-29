import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/students/studentSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
  },
});
