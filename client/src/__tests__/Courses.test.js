import React from 'react';
import {render, screen, fireEvent, act, cleanup} from "@testing-library/react";
import axios from 'axios';


import {IndexView, CourseTemplate} from '../views/Course/Index';
import CourseMock from '../models/CourseMock';
import '@testing-library/jest-dom';


jest.mock('axios');


const studentUser = {
    id: 1,
    is_account_pending: 0,
    is_admin: 0,
    is_instructor: 0,
    last_login: null,
    login: "student",
    name: "Student",
    password: null,
    verification_key: null,
    verification_key_date: "2021-03-18 20:50:05"
}

const instructorUser = {
    id: 1,
    is_account_pending: 0,
    is_admin: 0,
    is_instructor: 1,
    last_login: null,
    login: "instructor",
    name: "instructor",
    password: null,
    verification_key: null,
    verification_key_date: "2021-03-18 20:50:05"
}

const adminUser = {
    id: 1,
    is_account_pending: 0,
    is_admin: 1,
    is_instructor: 0,
    last_login: null,
    login: "admin",
    name: "admin",
    password: null,
    verification_key: null,
    verification_key_date: "2021-03-18 20:50:05"
}

const models = {
    course: new CourseMock()
}


// Tests that Admin view of My Courses page works properly
describe('Student View of My Courses', () => {

    test('renders basic layout properly', () => {
        render(<IndexView current_user={studentUser} models={models}/>);

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
    })


    test('does not render "add course" button', () => {
        render(<IndexView current_user={studentUser} models={models}/>);
        
        expect(document.getElementById('createNewCourseButton')).toBeFalsy();
    })


    test('renders fetched courses', async () => {
        const promise = Promise.resolve({payload: "data"});
        axios.get.mockImplementationOnce(() => promise);
        
        render(<IndexView current_user={studentUser} models={models}/>);

        await act(() => promise);
        
        expect(screen.getByText("CS 211")).toBeInTheDocument();
    })

})


// Tests that Admin view of My Courses page works properly
describe('Instructor View of My Courses', () => {

    test('renders basic layout properly', () => {
        render(<IndexView current_user={instructorUser} models={models}/>);

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
    })


    test('renders "add course" button', () => {
        render(<IndexView current_user={instructorUser} models={models}/>);
        
        expect(document.getElementById('createNewCourseButton')).toBeInTheDocument();
    })


    test('clicking "add course" button creates template', () => {
        render(<IndexView current_user={instructorUser} models={models}/>);
        fireEvent.click(document.getElementById('createNewCourseButton'));
        render(<IndexView current_user={instructorUser} models={models}/>);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    })

    test('renders fetched courses', async () => {
        const promise = Promise.resolve({payload: "data"});
        axios.get.mockImplementationOnce(() => promise);
        
        render(<IndexView current_user={studentUser} models={models}/>);

        await act(() => promise);
        
        expect(screen.getByText("CS 211")).toBeInTheDocument();
    })

})


// Tests that Admin view of My Courses page works properly
describe('Adimin View of My Courses', () => {

    test('renders basic layout properly', () => {
        render(<IndexView current_user={adminUser} models={models}/>);

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
    })


    test('renders "add course" button', () => {
        render(<IndexView current_user={adminUser} models={models}/>);

        expect(document.getElementById('createNewCourseButton')).toBeInTheDocument();
    })


    test('clicking "add course" button creates template', () => {
        render(<IndexView current_user={adminUser} models={models}/>);
        fireEvent.click(document.getElementById('createNewCourseButton'));
        render(<IndexView current_user={adminUser} models={models}/>);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    })

    test('renders fetched courses', async () => {
        const promise = Promise.resolve({payload: "data"});
        axios.get.mockImplementationOnce(() => promise);
        
        render(<IndexView current_user={studentUser} models={models}/>);

        await act(() => promise);

        screen.debug();
        
        expect(screen.getByText("CS 211")).toBeInTheDocument();
        expect(screen.getByText("Add")).toBeInTheDocument();
    })

})


// Tests for Course Template Component
describe('Course Template', () => {

    test('renders component properly', () => {
        const handleSubmission = jest.fn();

        render(
            <table>
                <tbody>
                    <CourseTemplate handleSubmission={handleSubmission} props="" />
                </tbody>
            </table>
        );

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByPlaceholderText("course name")).toBeInTheDocument();
        expect(screen.getByText('HSU')).toBeInTheDocument();
        expect(screen.getByText('Spring')).toBeInTheDocument();
    }) 


    test('handleSubmission is called when "Submit" is clicked', () => {
        const handleSubmission = jest.fn();

        render(
            <table>
                <tbody>
                    <CourseTemplate handleSubmission={handleSubmission} props="" />
                </tbody>
            </table>
        );

        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(handleSubmission).toHaveBeenCalledTimes(1);
    }) 
})


