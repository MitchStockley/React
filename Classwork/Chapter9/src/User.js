// Import necessary modules and components
import React, { Component } from 'react';
import firebase from 'firebase/compat/app'; // Firebase for database operations
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Table, Button, Modal } from 'react-bootstrap'; // Bootstrap components for styling
import { Link } from 'react-router-dom'; // Link for routing
import { Nav, NavLink } from 'react-bootstrap'; // Bootstrap navigation components

// Define a class-based component called User
class User extends Component {

    // Constructor for the component
    constructor(props) {
        super(props);
        this.state = {
            users: [], // Array to store user data
            showDeleteDialog: false, // Flag to show/hide delete confirmation dialog
            selectedUser: {} // Selected user for deletion
        };

        // Bind event handlers to this instance
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Method to delete a user
    delete(e) {
        firebase.database().ref('/' + this.state.selectedUser.key).remove()
            .then(x => {
                console.log("SUCCESS");
                this.closeDeleteDialog();
            })
            .catch(error => {
                alert("Could not delete the user.");
                console.log("ERROR", error)
            });
    }

    // Method to open the delete confirmation dialog
    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }

    // Method to close the delete confirmation dialog
    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
    }

    // Lifecycle method that runs after the component is mounted
    componentDidMount() {
        firebase.database().ref('/')
            .on('value', snapshot => {
                let returnArr = [];

                // Iterate through Firebase snapshot data and convert to an array
                snapshot.forEach(data => {
                    var user = data.val();
                    user['key'] = data.key;
                    returnArr.push(user);
                });

                // Update component state with the retrieved user data
                this.setState({
                    users: returnArr
                })
            });
    }

    // Render method for the component
    render() {
        // Map user data to table rows
        const listUsers = this.state.users.map((user) =>
            <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`/edit/${user.key}`}>
                        Edit
                    </Link>
                </td>
                <td>
                    <Button onClick={this.openDeleteDialog.bind(this, user)}>Remove</Button>
                </td>
            </tr>
        );

        // Render the component's content
        return (
            <div>
                <Link to="/add">
                    <Button variant="primary">Add</Button>
                </Link>

                {/* Display user data in a table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}
                    </tbody>
                    {/* Modal for user deletion confirmation */}
                    <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete {this.state.selectedUser.username}?</p>
                            <hr />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.delete}>Delete</Button>
                            <Button onClick={this.closeDeleteDialog}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Table>
            </div>
        );
    }
}

// Export the User component
export default User;
