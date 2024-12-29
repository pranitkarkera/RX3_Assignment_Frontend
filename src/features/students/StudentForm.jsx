import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "./studentSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        gender: "",
        attendance: "",
        marks: ""
    });
    
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.student) {
            setFormData(location.state.student);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,    
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        if (!formData.name || !formData.age || !formData.grade || !formData.gender) {
            setMessage("Please fill in all required fields.");
            return;
        }
        try {
            if (location.state && location.state.student) {
                const updatedStudent = formData;
                await dispatch(updateStudentAsync(updatedStudent));
                setMessage("Student updated successfully!");
                setTimeout(()=> {
                navigate("/")
                }, 3000)
            } else {
                const newStudent = formData;
                await dispatch(addStudentAsync(newStudent));
                setMessage(" Student added successfully!");
                setTimeout(()=> {
                navigate("/")
                }, 3000)
            }
        } catch (error) {
            console.error("Error adding/updating student:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Header />
            <div className="container py-4">
                <h1>{location.state && location.state.student ? "Edit Student" : "Add Student"}</h1>
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" type="text" onChange={handleChange} value={formData.name} /><br /><br />
                    <input name="age" placeholder="Age" type="number" onChange={handleChange} value={formData.age} /><br /><br />
                    <input name="grade" placeholder="Grade" type="text" onChange={handleChange} value={formData.grade} /><br /><br />
                    <label>Gender: </label>
                    <input className="ms-2" id="male" name="gender" value="Male" type="radio" onChange={handleChange} checked={formData.gender === "Male"} />
                    <label htmlFor="male">Male</label>
                    <input className="ms-2" id="female" name="gender" value="Female" type="radio" onChange={handleChange} checked={formData.gender === "Female"} />
                    <label htmlFor="female">Female</label><br /><br />
                    {location.state && location.state.student && (
                        <>
                            <input name="attendance" type="number" placeholder="Attendance" onChange={handleChange} value={formData.attendance} /><br /><br />
                            <input name="marks" type="number" placeholder="Marks" onChange={handleChange} value={formData.marks} /><br /><br />
                        </>
                    )}
                    <button className="btn btn-primary" type="submit">{location.state && location.state.student ? "Update" : "Add"}</button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;