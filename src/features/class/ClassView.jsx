import { useDispatch, useSelector } from "react-redux"
import { setFilter, setSortBy } from "../students/studentSlice"
import Header from "../../components/Header"

const ClassView = () => {
    const {students, filter, sortBy} = useSelector((state) => state.students)
    const dispatch = useDispatch()
    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value))
    }
    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value))
    }

    const filteredStudents = students.filter(student => {
        if(filter === "All"){
            return true
        }
        if(filter === "Boys"){
            return student.gender === "Male"
        }
        if(filter === "Girls"){
            return  student.gender === "Female"
        }
        return true
    })

    const sortedStudents = filteredStudents.sort((a, b) => {
        if(sortBy === "name"){
            return a.name.localeCompare(b.name)
        }
        if(sortBy === "marks"){
            return a.marks - b.marks
        }
        if(sortBy === "attendance"){
            return a.attendance - b.attendance
        }
        return 0
    })
    // console.log(sortedStudents)

    return(
        <div>
            <Header />
            <div className="container py-4">
            <h1>Class View</h1>
            <hr />
            <div className="row">
            <div className="col-6">
                <label htmlFor="filtering">Filter by Gender: </label>
                 <select id="filtering" onChange={handleFilterChange} className="form-control">
                    <option value="All">All</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                </select>
            </div>
            <div className="col-6">
                <label htmlFor = "sorting">Sort by: </label>
                <select id="sorting" onChange={handleSortChange} className="form-control">
                    <option value="name">Name</option>
                    <option value="marks">Marks</option>
                    <option value="attendance">Attendance</option>
                </select>
            </div>
            </div>
        
            <ul className="py-4">
                {sortedStudents.map(student => <li key={student._id}>{student.name} - {student.gender} - Marks: {student.marks} - Attendance: {student.attendance}</li>)}
            </ul>
            </div>
        </div>
    )
}

export default ClassView
