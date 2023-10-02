// Import necessary modules and components
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formik for form management
import firebase from 'firebase/compat/app'; // Firebase for database operations
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { useParams } from 'react-router-dom'; // useParams for getting route parameters

// Define a class-based component called UserForm
class UserForm extends Component {

    // Declare class properties for title and id
    title;
    id;

    // Constructor for the component
    constructor(props) {
        super(props);

        // Initialize id from route parameters and set a default title
        this.id = this.props.params.id;
        this.title = 'New User';

        // Initialize component state for username and email
        this.state = {
            username: '',
            email: '',
        };

        // If id is present (editing an existing user), update the title
        if (this.id) {
            this.title = 'Edit User';
        }
    }

    // Lifecycle method that runs after the component is mounted
    componentDidMount() {
        if (this.id) {
            // Fetch user data from Firebase and update component state
            firebase.database().ref('/' + this.id)
                .on('value', snapshot => {
                    this.setState({
                        username: snapshot.val().username,
                        email: snapshot.val().email,
                    });
                });
        }
    }

    // Render method for the component
    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        username: this.state.username,
                        email: this.state.email
                    }}
                    validate={values => {
                        // Validation logic for username and email fields
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        else if (values.email.length < 10) {
                            errors.email = 'Email address too short';
                        }

                        if (!values.username) {
                            errors.username = 'Required';
                        }
                        else if (values.username.length < 3) {
                            errors.username = 'Username too short';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        // Form submission logic
                        setTimeout(() => {
                            if (this.id) {
                                // Update existing user data in Firebase
                                firebase.database().ref('/' + this.id).update({
                                    username: values.username,
                                    email: values.email
                                }).then(() => window.location.href = ("/"));
                            }
                            else {
                                // Create a new user entry in Firebase
                                firebase.database().ref('/').push({
                                    username: values.username,
                                    email: values.email
                                }).then(() => window.location.href = ("/"));
                            }

                            // Reset form submitting state
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="username" placeholder="Username" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="username" component="div" />
                            </span>
                            <Field type="text" name="email" placeholder="Email" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" component="div" />
                            </span>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

// Export a functional component that wraps UserForm and passes route parameters
export default (props) => (
    <UserForm
        {...props}
        params={useParams()}
    />
);
