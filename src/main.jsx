import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import { Provider } from 'react-redux';
import store from './app/store';
import StudentForm from './features/students/StudentForm';
import StudentDetails from './features/students/StudentDetails';
import ClassView from './features/class/ClassView';
import SchoolView from './features/school/SchoolView';

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/update-student/:id" element={<StudentForm />} />
          <Route path="/studentDetail/:studentId" element={<StudentDetails />} />
          <Route path="/classView" element={<ClassView />} />
          <Route path="/schoolView" element={<SchoolView />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);