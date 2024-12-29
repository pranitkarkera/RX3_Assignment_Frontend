    import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
    import axios from "axios"

    export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
        const response = await axios.get(`https://rx-3-assignment-backend-omega.vercel.app/students`)
        return response.data
    })

    export const addStudentAsync =  createAsyncThunk("students/addStudentAsync", async (newStudent) => {
        console.log("Adding student:", newStudent);
        const response = await axios.post(`https://rx-3-assignment-backend-omega.vercel.app/students`, newStudent)
        return response.data
    })

    export const updateStudentAsync = createAsyncThunk("students/updateStudentAsync", async ( updatedStudent) =>{
        const response = await axios.put(`https://rx-3-assignment-backend-omega.vercel.app/students/${updatedStudent._id}`, updatedStudent)
        return response.data
    })

    export const deleteStudentAsync = createAsyncThunk("students/deleteStudentAsync", async (id) => {
        await axios.delete(`https://rx-3-assignment-backend-omega.vercel.app/students/${id}`)
        return id
    })

    export const studentsSlice = createSlice({
        name: "students",
        initialState: {
            students: [],
            status: "idle",
            error: null,
            filter: "All",
            sortBy: "name",
            schoolStats: {
                totalStudents: 0,
                averageAttendance: 0,
                averageMarks: 0,
                topStudent: null
            }
        },
        reducers: {
            setFilter: (state, action) => {
        state.filter = action.payload
            },
            setSortBy: (state,action) => {
        state.sortBy = action.payload
            },
            updateSchoolStats: (state, action) => {
        state.schoolStats = {...state.schoolStats, ...action.payload}
            },
            setTopStudent: (state, action) => {
        state.schoolStats.topStudent = action.payload
            }

        },
        extraReducers: (builder) => {
            builder.addCase(fetchStudents.pending, (state) => {
                state.status = "loading"
            });
            builder.addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.students = action.payload
            });
            builder.addCase(fetchStudents.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            builder.addCase(addStudentAsync.fulfilled, (state, action) => {
                state.students.push(action.payload)
            });
            builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
                const index = state.students.findIndex(student => student._id === action.payload._id)
                if(index >= 0){
                    state.students[index] = action.payload
                }
            })
            builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
            state.students = state.students.filter(student => student._id !== action.payload)
            })
        }
    })

    export const {setFilter, setSortBy, updateSchoolStats, setTopStudent} = studentsSlice.actions

    export default studentsSlice.reducer;
