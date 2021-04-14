import React from 'react';
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'


import {IndexView} from '../views/Course/Index';
import CourseMock from '../models/CourseMock';
import '@testing-library/jest-dom';



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




// Course Test Suite
describe('Course', () => {

    console.log("MODELS ", models);
    test('renders student view properly', () => {
        render(
            <IndexView current_user={studentUser} models={models}/>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
        
        expect(document.getElementById('createNewCourseButton')).toBeFalsy();
    });



    test('renders instructor view properly', () => {
        render(
            <IndexView current_user={instructorUser} models={models}/>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
        
        expect(document.getElementById('createNewCourseButton')).toBeTruthy();
    });




    test('renders admin view properly', () => {
        render(
            <IndexView current_user={adminUser} models={models}/>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
        
        expect(document.getElementById('createNewCourseButton')).toBeTruthy();
    });
})


