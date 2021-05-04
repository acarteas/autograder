import React, { Component } from 'react';
import { connect } from "react-redux";
import './index.css';
import { Link } from 'react-router-dom';



const mapStateToProps = state => {
   return { current_user: state.current_user, models: state.models };
};


let create = false;


class IndexView extends Component {

   constructor(props) {
      super(props);

      this.state = {
         all_courses: [],
         enrolled_courses: {},
         archived_courses: {}
      };

      this.getCourses = this.getCourses.bind(this);
      this.courseButtonClick = this.courseButtonClick.bind(this);
      this.renderModifyLink = this.renderModifyLink.bind(this);
      this.renderAssignmentsLink = this.renderAssignmentsLink.bind(this);
   }


   
   // Add the new course to the database
   async addCourseAsync(course, parent) {      
      const user_id = parent.props.current_user.id;
      await parent.props.models.course.addCourseAsync(course, user_id);
      parent.getCourses(user_id);
      create = false;
   }



   async archiveCourse(course_id) {
      const user_id = this.props.current_user.id;
      await this.props.models.course.archiveCourse(course_id, user_id);
      this.getCourses(user_id);
   }


   async reinstateCourse(course_id) {
      const user_id = this.props.current_user.id;
      await this.props.models.course.reinstateCourse(course_id, user_id);
      this.getCourses(user_id);
   }


   async deleteCourse(course_id) {
      const confirm = window.confirm("Are you sure you would like to delete this course?");
      if (confirm) {
         const user_id = this.props.current_user.id;
         await this.props.models.course.deleteCourse(course_id, user_id);
         this.getCourses(user_id);
      }
   }





   componentDidMount() {
      this.getCourses(this.props.current_user.id);
   }

   componentWillReceiveProps(new_props) {
      this.getCourses(new_props.current_user.id);
   }

   courseButtonClick(evt) {

      const button_id = evt.target.dataset.id;
      if (this.state.enrolled_courses[button_id] === undefined) {
         //add request
         this.props.models.course.addUser(button_id, this.props.current_user.id)
            .then(() => {
               let enrolled_courses = { ...this.state.enrolled_courses };
               enrolled_courses[button_id] = { id: button_id };
               this.setState({ enrolled_courses: enrolled_courses });
            })
            .catch((err) => { });
      }
      else {
         //remove request
         this.props.models.course.removeUser(button_id, this.props.current_user.id)
            .then(() => {
               let enrolled_courses = { ...this.state.enrolled_courses };
               delete enrolled_courses[button_id];
               this.setState({ enrolled_courses: enrolled_courses });
            })
            .catch((err) => { });
      }
   }

   //will load enrolled courses then all courses for the user
   getCourses(user_id) {
      this.props.models.course.getCoursesForUser(user_id)
         .then(result => {
            let courses = {};
            let archived = {};
            for (let course of result) {
               if (course.is_active) {
                  courses[course.id] = course;
               }
               else {
                  archived[course.id] = course;
               }
            }
            return new Promise(resolve => this.setState({ enrolled_courses: courses, archived_courses: archived }, resolve));
         })
         .then(() => this.props.models.course.all())
         .then(result => {

            this.setState({ all_courses: result });
         })
         .catch((err) => { });
   }

   renderModifyLink(should_render, course_id) {
      if (should_render === true) {
         return (
            <Link to={"/course/" + course_id + "/manage"} className="btn btn-primary" style={{ color: "#FFFFFF" }}>Manage</Link>
         );
      }
      else {
         return (<span></span>)
      }
   }

   renderAssignmentsLink(should_render, course_id) {
      if (should_render === true) {
         return (
            <Link to={"/course/" + course_id + "/assignments/"} className="btn btn-primary" style={{ color: "#FFFFFF" }}>Assignments</Link>
         );
      }
      else {
         return (<span></span>)
      }
   }

   

   render() {
      const all_courses = this.state.all_courses;
      const enrolled_courses = this.state.enrolled_courses;
      const archived_courses = this.state.archived_courses;
      const self = this;

      
      const toggleCreate = () => {
         create = !create;
         this.getCourses(this.props.current_user.id);
      }

      return (
         <article className="container">
            <article>
               <h1>My Courses</h1>
               <table className="table table-striped text-left">
                  <thead>
                     <tr>
                        <th scope="col">
                           {
                              ((this.props.current_user.is_instructor === 1)
                              || (this.props.current_user.is_admin === 1))
                              && <button
                              className={(create) ? "btn btn-danger" : "btn btn-success"}
                              onClick={toggleCreate}
                              id="createNewCourseButton"
                              >
                              {(create) ? "X" : "+"}
                              </button>
                           }
                        </th>
                        <th scope="col">Course Name</th>
                        <th scope="col">School</th>
                        <th scope="col">Year</th>
                        <th scope="col">Term</th>
                     </tr>
                  </thead>
                  <tbody>
                     {all_courses.reduce((result, course) => {
                        if (enrolled_courses[course.id] !== undefined) {
                           result.push(course)
                        }
                        return result;
                     }, []).map((value, index) => {
                        const course_roles = self.props.models.course.getCoursePrivileges(enrolled_courses[value.id].course_role);
                        const user_roles = {
                           is_instructor: Boolean(self.props.current_user.is_instructor),
                           is_admin: Boolean(self.props.current_user.is_admin),
                           is_account_pending: Boolean(self.props.current_user.is_account_pending)
                        };
                        const is_instructor = course_roles.can_modify_course && (user_roles.is_instructor || user_roles.is_admin) && !user_roles.is_account_pending;
                        const is_grader = course_roles.can_grade_assignment && !user_roles.is_account_pending;
                        const can_submit = course_roles.can_submit_assignment && !user_roles.is_account_pending;

                        
                        return (
                           <tr key={value.id}>
                              <td>
                                 {(!is_instructor) ? <button className="btn btn-primary" data-id={value.id} onClick={self.courseButtonClick}>Remove</button> : is_instructor && <button className="btn btn-primary" data-id={value.id} onClick={() => this.archiveCourse(value.id)}>Archive</button>}
                                 &nbsp;
                                 {this.renderModifyLink(is_instructor, value.id)}
                                 &nbsp;
                                 {this.renderAssignmentsLink((can_submit || is_grader || is_instructor), value.id)}
                              </td>
                              <td>
                                 {value.name}
                              </td>
                              <td>
                                 {value.acronym}
                              </td>
                              <td>
                                 {value.year}
                              </td>
                              <td>
                                 {value.term}
                              </td>
                           </tr>
                        )
                     }
                     )}
                     {create && <CourseTemplate 
                        handleSubmission={self.addCourseAsync}
                        props={self}
                        />}
                  </tbody>
               </table>
            </article>
            <article>
               <h1>{(this.props.current_user.is_instructor) ? "Archived Courses" : "Available Courses"}</h1>
               <table className="table table-striped">
                  <thead>
                     <tr>
                        <th scope="col">

                        </th>
                        <th scope="col">Course Name</th>
                        <th scope="col">School</th>
                        <th scope="col">Year</th>
                        <th scope="col">Term</th>
                     </tr>
                  </thead>
                  <tbody>
                     {all_courses.reduce((result, course) => {
                        if (this.props.current_user.is_instructor){
                           if (archived_courses[course.id] !== undefined) {
                              result.push(course);
                           }
                        }
                        else {
                           if (enrolled_courses[course.id] === undefined) {
                              if (course.is_active) {
                                 result.push(course);
                              }
                           }
                        }
                        return result;
                     }, []).map((value, index) => (
                           <tr key={value.id}>
                              <td>
                              {(!this.props.current_user.is_instructor) ? <button className="btn btn-primary" data-id={value.id} onClick={self.courseButtonClick}>Add</button> : 
                                 <>
                                    <button className="btn btn-primary" data-id={value.id} onClick={() => this.reinstateCourse(value.id)}>Reinstate</button>
                                    &nbsp;
                                    <button className="btn btn-danger" data-id={value.id} onClick={() => this.deleteCourse(value.id)}>Delete</button>
                                 </>}
                              </td>
                              <td>
                                 {value.name}
                              </td>
                              <td>
                                 {value.acronym}
                              </td>
                              <td>
                                 {value.year}
                              </td>
                              <td>
                                 {value.term}
                              </td>
                           </tr>
                        )
                     )}
                  </tbody>
               </table>
            </article>
         </article>
      );
   }
}



// Course template to be filled out by creator
const CourseTemplate = ({handleSubmission, props}) => {
   const [courseName, setCourseName] = React.useState("");
   const [schoolId, setSchoolId] = React.useState("1");
   const [term, setTerm] = React.useState("Spring");
   const [year, setYear] = React.useState("");
   
   return (
      <tr>
         <td>
            <button
               id='submitNewCourseButton' 
               className="btn btn-primary" 
               onClick={() => handleSubmission({
                  school_id: schoolId,
                  name: courseName,
                  term: term,
                  year: year
               }, props)}
               >Submit</button> 
         </td>
         <td>
            <input 
               placeholder="course name"
               onChange={e => setCourseName(e.target.value)}
            ></input>
         </td>
         <td>
           <select onChange={e => setSchoolId(e.target.value)}>
              <option value="1">HSU</option>
           </select>
         </td>
         <td>
            <input 
               placeholder="year"
               onChange={e => setYear(e.target.value)}
            ></input>
         </td>
         <td>
         <select onChange={e => setTerm(e.target.value)}>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
           </select>
         </td>
      </tr>
   );
};



const Index = connect(mapStateToProps)(IndexView);
export { Index, IndexView, CourseTemplate };
export default Index;