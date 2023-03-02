
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseView from './components/CourseView';
import Dash from './components/Dash';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })


  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch('http://localhost:4000/users/details', {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      } else {
        setUser ({
          id: null,
          isAdmin: null
        })
      }
    })
  },[]);

  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/admin" element={<Dash/>}/>
              <Route path="/addCourse" element={<AddCourse/>} />
              <Route path="/editCourse/:courseId" element={<EditCourse/>} />
              <Route path="/courses" element={<Courses/>}/>
              <Route path="/courses/:courseId" element={<CourseView/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
          </Container>
        </Router>
    </UserProvider>
  );
}

export default App;
