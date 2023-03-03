// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

export default function CourseCard({courseProp}){

	let { name, description, price, _id } = courseProp;

	return(
		<Container className="p-3 mb-3">
			<Card className="h-100">
				<Card.Body className="d-flex flex-column">
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text>{description}</Card.Text>
					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>PHP {price}</Card.Text>
					<Button className="mt-auto mx-auto" style={{width: "120px"}} as={Link} to={`/courses/${_id}`}>Details</Button>
				</Card.Body>
			</Card>
		</Container>
	)
}