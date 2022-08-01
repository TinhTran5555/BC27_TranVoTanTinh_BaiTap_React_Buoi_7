import React, { Component } from "react";
import axios  from "axios/dist/axios.min.js";
export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {    
        account: "",
        name: "",
        password: "",
        email: "",
        phone: "",
        type: "",
      },
    };
  }
  handleChange = (evt) => {
    const { value, name } = evt.target;
    this.setState((state) => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();
    
   try {
    await axios.post("https://62b06198e460b79df0446b94.mockapi.io/ApiBtBuoi7", this.state.values);
    // Reset form 
    this.setState({
      values: {
        account: "",
        name: "",
        password: "",
        email: "",
        phone: "",
        type: "",
      },
    });
    // Callback get users 
    this.props.onSuccess();
   } catch (error) {
    console.log(error);
   }
  }
   handleUpdate = async (evt)=> {
    evt.preventDefault();
    const {id, ...payLoad} = this.state.values
    try {
      await axios.put (
      `https://62b06198e460b79df0446b94.mockapi.io/ApiBtBuoi7/${id}`,payLoad);
     // Reset form 
     this.setState({
      values: {
        account: "",
        name: "",
        password: "",
        email: "",
        phone: "",
        type: "",
      },
    });
    // Callback get users 
    this.props.onUpdate();
    } catch (error) {
      console.log(error);
    }
    
   }
  componentDidUpdate(prevProps, PrevState){
    if(this.props.user && this.props.user !== prevProps.user) {
      this.setState({ values: {...this.props.user}})
    }
  }
  render() {
    const { values } = this.state;
    return (
      <form >
        <div className="form-group mb-3">
          <label htmlFor="account" className="form-lable">
            Account
          </label>
          <input
            id="account"
            className="form-control"
            name="account"
            value={values.account}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-lable">
            name
          </label>
          <input id="name" className="form-control"
          name="name"
          value={values.name}
          onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-lable">
            Password
          </label>
          <input id="password" className="form-control"
          name="password"
          value={values.password}
          onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-lable">
            Email
          </label>
          <input id="email" className="form-control" 
          name="email"
          value={values.email}
          onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-lable">
            Phone
          </label>
          <input id="phone" className="form-control" 
          name="phone"
          value={values.phone}
          onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="type" className="form-lable">
            Type
          </label>
          <select id="type" className="form-control"
          name="type"
          value={values.type}
          onChange={this.handleChange}>
            <option>Loại người dùng</option>
            <option value="KH">Khách hàng</option>
            <option value="NV">Nhân Viên</option>
          </select>
        </div>
        <button className="btn btn-info me-3" onClick={this.handleSubmit}>Đăng kí</button>
        <button className="btn btn-warning" onClick={this.handleUpdate}>Cập nhật</button>
      </form>
    );
  }
}
