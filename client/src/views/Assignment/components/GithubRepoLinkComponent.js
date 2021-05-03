import React from 'react';
import axios from 'axios';
import { Container, Row, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// Simple form to collect and verify URL for submission to database
const GithubRepoLink = ({ assignment_id, props }) => {

    const [url, setUrl] = React.useState("");
    const [status, setStatus] = React.useState("");

    const submitUrl = async e => {
        e.preventDefault();
        try {
            const result = await props.models.assignment.linkRepository(assignment_id, url);
            (typeof(result) === "number") ? setStatus("SUCCESS") : setStatus(result);
            e.target.reset();
        }
        catch (err) {
            setStatus(err);
        }
    }

    const verifyUrl = input => {
        if (!input.startsWith('https://')) {
            (input === "") ? setStatus("") : setStatus("Must be complete URL! ex: https://github.com/{org}/{branch}");
        }
        else {
            setStatus("");
            setUrl(input);
        }
    }


    return (
        <Container>
            {(status === "SUCCESS") && <Alert variant="success">Repository was successfully linked!</Alert>}
            {!(status === "SUCCESS" || status === "") && <Alert variant="danger">{status}</Alert>}
            <Form onSubmit={submitUrl}>
                <Form.Group style={{ marginTop: "3em" }}>
                    <Form.Label>Paste URL to Github Repository</Form.Label>
                    <Form.Control as="input" placeholder="URL" onChange={e => verifyUrl(e.target.value)} />
                </Form.Group>
                <Button type="submit">Link Repo</Button>
            </Form>
        </Container>
    )



}


export default GithubRepoLink;