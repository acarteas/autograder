import React, { Component } from 'react';
import Session from '../../view_models/Session.js';
//import User from '../../models/User.js';
import { connect } from "react-redux";
import { updateUser } from '../../actions/index';
import './Create.css';

const mapStateToProps = state => {
   return { current_user: state.current_user, models: state.models };
};

const mapDispatchToProps = dispatch => {
   return {
      updateUser: user => dispatch(updateUser(user))
   };
};

class CreateView extends Component {

   constructor(props) {
      super(props);

      this.session = Session;
      this.state = {
         email: "",
         first_name: "",
         last_name: "",
         error_messages: ""
      };
      //this.user_manager = new User(this.props.config);
      this.createProfile = this.createProfile.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });
   }

   //TODO
   createProfile(evt) {
      evt.preventDefault();
      this.props.models.user.create(this.state)
         .then((user) => {
            this.props.updateUser(user);
         })
         .catch((err) => {
            this.setState({ error_messages: err });
         });
   }

   render() {
      const email = this.state.email;
      const last_name = this.state.last_name;
      const first_name = this.state.first_name;
      return (
         <article className="container">
            <h1>Create a Profile</h1>
            <form className="" onSubmit={this.createProfile}>
               <div className="form-group">
                  <label htmlFor="FirstNameTextBox">First Name</label>
                  <input
                     type="text"
                     className="form-control"
                     id="FirstNameTextBox"
                     name="first_name"
                     value={first_name}
                     onChange={this.handleInputChange}
                     placeholder=""
                  />
               </div>
               <div className="form-group">
                  <label htmlFor="LastNameTextBox">Last Name</label>
                  <input
                     type="text"
                     className="form-control"
                     id="LastNameTextBox"
                     name="last_name"
                     value={last_name}
                     onChange={this.handleInputChange}
                     placeholder=""
                  />
               </div>
               <div className="form-group">
                  <label htmlFor="EmailTextBox">
                     Email
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="EmailTextBox"
                     name="email"
                     value={email}
                     onChange={this.handleInputChange}
                     placeholder=""
                  />
               </div>
               <button id="SubmitButton" className="btn btn-outline-primary" type="submit">Create Profile</button>
            </form>
            <p>{this.state.error_messages}</p>
         </article >
      );
   }
}

const Create = connect(mapStateToProps, mapDispatchToProps)(CreateView);
export { Create };
export default Create;