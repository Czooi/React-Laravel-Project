import React, { Component } from 'react';
import axios from 'axios';
import './App.css'; // Import the updated modern CSS styles
import config from './config'; // Import the config file

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: ''
      },
      userList: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  // Handle input change
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  // Submit form data to the backend
  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${config.apiUrl}/users`, this.state.formData) // Use config for API URL
      .then(() => {
        alert('Data submitted successfully');
        this.setState({
          formData: {
            name: '',
            email: ''
          }
        });
        this.fetchUsers(); // Refresh user list after submission
      })
      .catch((error) => {
        console.error('Error submitting form', error);
      });
  }

  // Fetch all users from backend
  fetchUsers() {
    axios
      .get(`${config.apiUrl}/users`) // Use config for API URL
      .then((response) => {
        this.setState({ userList: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  // Fetch users on component mount
  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { formData, userList } = this.state;

    return (
      <div className="container">
        <div className="form-card glass">
          <h1 className="title">Add New User</h1>
          <form className="user-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={this.handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={this.handleInputChange}
                placeholder="example@email.com"
                required
              />
            </div>
            <button className="submit-btn" type="submit">
              Add User
            </button>
          </form>
        </div>

        <h2 className="user-list-title">Users List</h2>
        <table className="user-table glass">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
