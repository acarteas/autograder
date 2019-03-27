import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import CourseAssignmentSelector from '../components/CourseAssignmentSelector';

//components
import AddFiles from './components/AddFilesComponent';
import Source from './components/SourceViewComponent';
import TestCases from './components/TestCasesComponent';
import Results from './components/ResultsComponent';

const mapStateToProps = state => {
   return { current_user: state.current_user, models: state.models };
};

//AC Idea: have a separate dropdown for graders / instructors that allows them to toggle between students

class IndexView extends Component {

   constructor(props) {
      super(props);

      this.base_links =
         [{
            id: -1,
            url: "/assignment/add-files",
            name: "Add File(s)",
            css: "nav-link"
         },
         {
            id: -1,
            url: "/assignment/run",
            name: "Run",
            css: "nav-link"
         },
         {
            id: -1,
            url: "/assignment/results",
            name: "Results",
            css: "nav-link"
         }
         ];
      this.state = {
         links: this.base_links,
         files: [],
         file_data: {},
         current_assignment: { id: -1 },
         selected_user: this.props.current_user,
         student_roster: []
      };

      this.onAssignmentChange = this.onAssignmentChange.bind(this);
      this.updateFiles = this.updateFiles.bind(this);
      this.getAssignmentFiles = this.getAssignmentFiles.bind(this);
      this.getCourseUsers = this.getCourseUsers.bind(this);
      this.removeTab = this.removeTab.bind(this);
      this.render = this.render.bind(this);
      this.renderStudentSelector = this.renderStudentSelector.bind(this);
      this.selectedUser = this.selectedUser.bind(this);
   }

   selectedUser() {
      if (this.state.selected_user.id === -1) {
         return this.props.current_user;
      }
      return this.state.selected_user;
   }

   onAssignmentChange(assignment) {
      this.setState({ current_assignment: assignment }, () => {
         this.getAssignmentFiles();
         this.getCourseUsers();
      });
   }

   getCourseUsers() {
      let self = this;
      this.props.models.course.getCourseUsers(this.state.current_assignment.course_id)
         .then((result) => {
            let active_users = [];

            //filter course users based on access rights
            for (let user of result) {
               const privilege = this.props.models.course.getCoursePrivileges(user.course_role);
               if (privilege.can_submit_assignment === true) {
                  active_users.push(user);
               }
            }
            self.setState({ student_roster: active_users });
         })
         .catch(err => { console.log(err); });
   }

   getAssignmentFiles() {
      if (this.props.current_user.id > 0 && this.state.current_assignment.id > 0) {
         this.props.models.assignment.getFiles(this.state.current_assignment.id)
            .then((result) => {
               this.setState({ file_data: result.data, files: result.links }, () => {
                  this.updateTabs();
               });
            })
            .catch(() => { });
      }
   }

   updateTabs() {
      const files = this.state.files;
      let links = [...this.base_links];
      let links_by_name = {};
      for (let key of Object.keys(files)) {
         const file = files[key];
         const url = "/assignment/files/" + file.name.toLowerCase();
         const tab = { id: file.id, url: url, name: file.name, css: "nav-link" };
         links_by_name[tab.url] = tab;
      }
      for (let key of Object.keys(links_by_name)) {
         links.push(links_by_name[key]);
      }
      this.setState({ links: links });
   }

   updateFiles(files) {
      let previous_files = { ...this.state.files };
      for (let file of files) {
         previous_files[file.name] = file;
      }
      this.setState({ files: previous_files }, () => {
         this.updateTabs();
         this.getAssignmentFiles();
      });
   }

   removeTab(file_name) {
      let files = { ...this.state.files };
      delete files[file_name];
      this.setState({ files: files }, () => {
         this.updateTabs();
      });
   }

   renderStudentSelector(){
      if(this.state.student_roster.length > 0){
         return(
            <React.Fragment>
               Student: <select>
                {this.state.student_roster.map( (value, index) =>
                  <option key={index} value={index}>{value.last_name + ", " + value.first_name}</option>
         )}
            </select>
            </React.Fragment>
         );
      }
   }

   render() {
      const links = this.state.links;
      const state = this.state;

      //always start out at the file upload component
      if (this.props.location.pathname.toLowerCase() == '/assignment/' || this.props.location.pathname.toLowerCase() == '/assignment') {
         return (<Redirect to="/assignment/add-files" />)
      }
      return (
         <div>
            <article className="row">
            
            <CourseAssignmentSelector
               onAssignmentChange={this.onAssignmentChange} class_name="col-md-3" />
            <div className="col-md-3">
               {this.renderStudentSelector()}
            </div>
            </article>
            <div>
               <nav>
                  <ul className="nav nav-tabs">
                     {Object.keys(links).map((key) => {
                        const item = links[key];
                        const active_tab = this.state.active_tab;
                        let style = "nav-link";
                        return (
                           <li key={item.url} className="nav-item">
                              <NavLink
                                 to={item.url}
                                 className={style}
                                 activeClassName="active"
                              >{item.name}</NavLink>
                           </li>
                        );
                     })}
                  </ul>
               </nav>
               <Route path="/assignment/files/:name"
                  render={
                     ({ match }, props) => {
                        const file_name = match.params.name;
                        const file_data = state.file_data[file_name];
                        return (
                           <div className="container">
                              <Source
                                 source={file_data}
                              />
                           </div>
                        )
                     }
                  } />
               <Route path="/assignment/add-files"
                  render={
                     (props) => {
                        return (
                           <div className="container">
                              <AddFiles
                                 assignment={this.state.current_assignment}
                                 file_add_callback={this.updateFiles}
                                 file_remove_callback={this.removeTab}
                                 files={this.state.files}
                              />
                           </div>
                        )
                     }} />
               <Route path="/assignment/run"
                  render={
                     (props) => {
                        return (
                           <div className="container">
                              <TestCases assignment={this.state.current_assignment} />
                           </div>
                        )
                     }} />
               <Route path="/assignment/results"
                  render={
                     (props) => {
                        return (
                           <div className="container">
                              <Results
                                 assignment={this.state.current_assignment}
                                 user={this.selectedUser()}
                              />
                           </div>
                        )
                     }} />
            </div>
         </div>
      );
   }
}

const Index = connect(mapStateToProps)(IndexView);
export { Index };
export default withRouter(Index);