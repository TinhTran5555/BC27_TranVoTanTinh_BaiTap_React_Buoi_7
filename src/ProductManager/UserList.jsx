import React, { Component } from "react";
import axios from "axios/dist/axios.min.js";

export default class UserList extends Component {
  handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://62b06198e460b79df0446b94.mockapi.io/ApiBtBuoi7/${userId}`
      );
      this.props.onDeleteSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { users } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Mật khẩu</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Loại người dùng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.account}</td>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.type}</td>
                <td>
                  <button
                    className="btn btn-success me-3"
                    onClick={() => this.props.onSelectUser(user.id)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
