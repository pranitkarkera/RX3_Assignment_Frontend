import { Link } from "react-router-dom"

const StudentList = ({students}) =>{
    return(
        <div className="mt-2">
            <h2>Student List</h2>
            <div className="row">
            {students && students.map((student) =>
                <div className="col-4">
                    <div className="card" key={student._id}>
                        <div className="card-body">
                            <h5 className="card-title">{student.name || "N/A"}</h5>
                            <p className="card-text">(Age: {student.age || "N/A"})</p>
                            <p className="card-text">Grade: {student.grade || "N/A"}</p>
                            <p className="card-text">Marks: {student.marks || "N/A"}</p>
                            <p className="card-text">Attendance: {student.attendance || "N/A"}</p>
                            <Link to={`studentDetail/${student._id}`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}
export default StudentList
