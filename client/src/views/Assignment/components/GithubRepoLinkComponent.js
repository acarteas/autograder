import React from 'react';
import axios from 'axios';
import {Container, Row, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




const GithubRepoLink = (props) => {


    const [url, setUrl] = React.useState("");

    return (
        <Container>
            <Form>
                <Form.Group style={{marginTop: "3em"}}>
                    <Form.Label>Paste URL to Github Repository</Form.Label>
                    <Form.Control as="input" placeholder="URL" onChange={e => setUrl(e.target.value)} />
                </Form.Group>
                <Button onClick={"handleSubmission"}>Link Repo</Button>
            </Form>
        </Container>
    )
}


export default GithubRepoLink;