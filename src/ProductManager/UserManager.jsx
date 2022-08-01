import React, { Component } from "react";
import axios from "axios/dist/axios.min.js";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default class UserManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUser: null
    };
  }
  fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://62b06198e460b79df0446b94.mockapi.io/ApiBtBuoi7"
      );
      // Call API
      this.setState({ users: data });
    } catch (error) {
      console.log(error);
    }
  };
  fetchUserDelails = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://62b06198e460b79df0446b94.mockapi.io/ApiBtBuoi7/${userId}`
      );
      this.setState({selectedUser : data})
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-primary">User Manager</h1>
        <div className="card mb-5">
          <div className="card-header bg-dark text-white">
            <strong>User Form</strong>
          </div>
          <div className="card-body">
            <UserForm 
            onSuccess={this.fetchUsers} 
            onUpdate={this.fetchUsers}
            user = {this.state.selectedUser}
            />
          </div>
        </div>
        <UserList
          users={this.state.users}
          onDeleteSuccess={this.fetchUsers}
          onSelectUser={this.fetchUserDelails}
        />
      </div>
    );
  }
}
