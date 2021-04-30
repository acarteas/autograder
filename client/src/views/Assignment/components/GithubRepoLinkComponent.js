import React from 'react';
import axios from 'axios';
import { Container, Row, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GithubRepoLink = ({ assignment_id, props }) => {


    const [url, setUrl] = React.useState("");

    const submitUrl = async e => {
        e.preventDefault();

        try {
            const result = await props.models.assignment.linkRepository(assignment_id, url);
            e.target.reset();
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <Container>
            <Form onSubmit={submitUrl}>
                <Form.Group style={{ marginTop: "3em" }}>
                    <Form.Label>Paste URL to Github Repository</Form.Label>
                    <Form.Control as="input" placeholder="URL" onChange={e => setUrl(e.target.value)} />
                </Form.Group>
                <Button type="submit">Link Repo</Button>
            </Form>
        </Container>
    )
}


export default GithubRepoLink;