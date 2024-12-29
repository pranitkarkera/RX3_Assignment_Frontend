import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/Header"
import { setTopStudent, updateSchoolStats } from "../students/studentSlice"

const SchoolView = () => {
    const {students, schoolStats} = useSelector((state) => state.students)
const dispatch = useDispatch()
    useEffect(() => {
        if (students.length > 0) {
            const totalStudents = students.length;
            const totalAttendance = students.reduce((sum, student) => {
                return sum + (student.attendance || 0);
            }, 0);
            // console.log('totalAttendance',totalAttendance)

            const totalMarks = students.reduce((sum, student) => {
            return sum + (student.marks || 0);
            }, 0);
            // console.log('totalMarks',totalMarks)

            const averageAttendance = totalAttendance / totalStudents;
            // console.log('average Attendance',averageAttendance)
            const averageMarks = totalMarks / totalStudents;
            // console.log('average Marks',averageMarks)

            const topStudent = students.reduce((top, student) =>
              student.marks > top.marks ? student : top, students[0]);
              dispatch(updateSchoolStats({totalStudents, averageAttendance, averageMarks, topStudent}))
              dispatch(setTopStudent(topStudent))
            }
        }, [students, dispatch])

return(
    <div>
        <Header />
        <div className="container py-4">
        <h1>School View</h1>
        <hr />
        <div className="row text-center">
            <div className="col-3 border">
                <h3 className="mt-2">Total Students</h3>
                <p className="fs-3">{schoolStats.totalStudents}</p>
            </div>
            <div className="col-3 border">
                <h3 className="mt-2">Average Attendance</h3>
                <p className="fs-3">{schoolStats.averageAttendance?.toFixed(2)}</p>
            </div>
            <div className="col-3 border">
                <h3 className="mt-2">Average Marks</h3>
                <p className="fs-3">{schoolStats.averageMarks?.toFixed(2)}</p>
            </div>
            <div className="col-3 border">
                <h3 className="mt-2">Top Student</h3>
                <p className="fs-3">{schoolStats.topStudent ? schoolStats.topStudent.name : "-"}</p>
            </div>
        </div>
        </div>
    </div>
    )
}

export default SchoolView
