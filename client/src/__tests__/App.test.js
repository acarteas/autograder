import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import {render, screen} from "@testing-library/react";


import {Index} from '../views/Course/Index';
import Course from '../models/Course';
import { Provider } from "react-redux";
import store from "../store/index";
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
    course: Course
}




// Course Test Suite
describe('Course', () => {

    test('renders student view properly', () => {
        render(
        <Provider store={store}>
          <Index current_user={studentUser} models={models} />  
        </Provider>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();

        expect(document.getElementById('createNewCourseButton')).toBeFalsy();
    });

    test('renders instructor view properly', () => {
        render(
        <Provider store={store}>
          <Index current_user={instructorUser} models={models} />  
        </Provider>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
        
        expect(document.getElementById('createNewCourseButton')).toBeFalsy();
    });


    test('renders admin view properly', () => {
        render(
        <Provider store={store}>
          <Index current_user={studentUser} models={models} />  
        </Provider>
        );

        screen.debug();

        expect(screen.getByText('Available Courses')).toBeInTheDocument();
        expect(screen.getByText('My Courses')).toBeInTheDocument();
        
        expect(document.getElementById('createNewCourseButton')).toBeFalsy();
    });
})

