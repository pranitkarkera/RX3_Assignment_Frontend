import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteStudentAsync } from "./studentSlice";
import Header from "../../components/Header";

const StudentDetail = () => {
    const data = useSelector((state) => state.students.students);
    const dispatch = useDispatch();
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        console.log("Student ID:", studentId);
        console.log("All Students Data:", data);
        
        const student = data.find(curr => curr._id === studentId) || {};
        setStudentData(student);
    }, [data, studentId]);

    const deleteStudentHandler = async () => {
        try {
            await dispatch(deleteStudentAsync(studentId));
            navigate("/"); 
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    if (!studentData.name) {
        return <p>Loading student details...</p>;
    }

    return (
        <div>
            <Header />
            <div className="container py-4">
                <h1>Student Detail</h1>
                <p>Name: {studentData.name}</p>
                <p>Age: {studentData.age}</p>
                <p>Grade: {studentData.grade}</p>
                <p>Attendance: {studentData.attendance || "N/A"}</p>
                <p>Marks: {studentData.marks || "N/A"}</p>
                <Link className="btn btn-warning"
                    to={{
                        pathname: `/update-student/${studentId}`,
                    }}
                    state={{ student: studentData }}
                >
                    Edit Details
                </Link>
                <button className="ms-2 btn btn-danger" onClick={deleteStudentHandler}>Delete</button>
            </div>
        </div>
    );
};

export default StudentDetail;