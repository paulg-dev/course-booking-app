import { useContext, useState, useEffect } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import { formatPrice } from '../utils.js';

import Swal from "sweetalert2";

export default function Dash(){

	const {user} = useContext(UserContext);

	const [allCourses, setAllCourses] = useState([]);

	const fetchData = () => {

		fetch(`${process.env.REACT_APP_API_URL}/courses/all`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			setAllCourses(data.map((course, index) => {
				return(
					<tr key={course._id}>
						<td>{index + 1}</td>
						<td className="hideOnSmall">{course._id}</td>
						<td>{course.name}</td>
						<td className="hideOnSmall">{course.description}</td>
						<td className="hideOnSmall">{formatPrice(course.price)}</td>
						<td>{course.isActive ? "Active" : "Inactive"}</td>
						<td>
							<ButtonGroup vertical>
								{ 
									(course.isActive) ?
									<Button variant="dark" size="sm" onClick={() => archive(course._id, course.name)}>Archive</Button>
									:
									<Button variant="success" size="sm" onClick={() => unarchive(course._id, course.name)}>Unarchive</Button>
								}
								<Button as={ Link } to={`/courses/${course._id}`} variant="primary" size="sm" className="mt-1">View</Button>
								<Button as={ Link } to={`/editCourse/${course._id}`} variant="secondary" size="sm" className="mt-1">Edit</Button>
							</ButtonGroup>

	
						</td>
					</tr>
				)
			}))

		})
	}

	const archive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/archive`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: false
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if (data) {
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${courseName} is now inactive.`,
					confirmButtonColor: "#23857a"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`,
					confirmButtonColor: "#23857a"
				})
			}
		})
	}

	const unarchive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/active`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data) {
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${courseName} is now active.`,
					confirmButtonColor: "#23857a"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: "Something went wrong. Please try again later!",
					confirmButtonColor: "#23857a"
				})
			}
		})
	}

	useEffect(() => {
		fetchData();
	})

	return (

		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h3 className="page-header">Admin Dashboard</h3>
				<Button className="m-2" as={Link} to="/addCourse" variant="primary" size="md">Add Course</Button>
				<Button as={Link} to="/admin/enrollments" variant="secondary" size="md" className="m-2">Show Enrollments</Button>
			</div>
			<Table className="admin-course-table text-center align-middle" width="100%" striped hover>
		     <thead className="align-middle">
		       <tr>
		       	 <th width="5%">#</th>
		         <th className="hideOnSmall" width="13%">Course ID</th>
		         <th width="17%">Course Name</th>
		         <th className="hideOnSmall" width="35%">Description</th>
		         <th className="hideOnSmall" width="12%">Price</th>
		         <th width="8%">Status</th>
		         <th width="10%">Action</th>
		       </tr>
		     </thead>
		     <tbody>
		       { allCourses }
		     </tbody>
		   </Table>
		</>
		:
		<Navigate to="/courses" />
		
	)
}