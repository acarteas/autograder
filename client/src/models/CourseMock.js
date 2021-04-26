
class CourseMock {
   constructor(site_config, cache_results = false) {
      this.config = site_config;
      this.cache_results = cache_results;
      this.PRIVILEGES = {
         is_pending: "is_pending",
         can_submit_assignment: "can_submit_assignment",
         can_modify_course: "can_modify_course",
         can_grade_assignment: "can_grade_assignment"
      };
      this.getCoursesForUser = this.getCoursesForUser.bind(this);
      this.getActiveAssignmentsForCourse = this.getActiveAssignmentsForCourse.bind(this);
      this.addUser = this.addUser.bind(this);
      this.addUserAsync = this.addUserAsync.bind(this);
      this.all = this.all.bind(this);
      this.removeUser = this.removeUser.bind(this);
      this.getCoursePrivileges = this.getCoursePrivileges.bind(this);
      this.getCoursePrivilegeNumber = this.getCoursePrivilegeNumber.bind(this);
      this.addCourseAsync = this.addCourseAsync.bind(this);
   }


   // Adds new course to the database, returns course_id of new course
   async addCourseAsync(course, user_id) {


   }


   // Async version of original addUser function
   async addUserAsync(course_id, user_id) {

   }

   // Adds the current user to the specified course
   addUser(course_id, user_id) {

   }


   // Unsure what this function does
   all() {
      return [{
         acronym: "HSU",
         id: 1,
         is_active: 1,
         is_deleted: 0,
         name: "CS 211",
         school_id: 1,
         school_name: "Humboldt State University",
         term: "Spring",
         year: 2019
      }];
   }


   getActiveAssignmentsForCourse(course_id) {

   }

   /**
    * Returns an object of allowable course actions for the present course user's course_role
    * @param {Number} course_role 
    */
   getCoursePrivileges(course_role) {
      let actions = {
         is_pending: false,
         can_submit_assignment: false,
         can_modify_course: false,
         can_grade_assignment: false
      };

      if ((course_role & 0b1) > 0) {
         actions[this.PRIVILEGES.is_pending] = true;
      }
      if ((course_role & 0b10) > 0) {
         actions[this.PRIVILEGES.can_submit_assignment] = true;
      }
      if ((course_role & 0b100) > 0) {
         actions[this.PRIVILEGES.can_modify_course] = true;
      }
      if ((course_role & 0b1000) > 0) {
         actions[this.PRIVILEGES.can_grade_assignment] = true;
      }

      return actions;
   }

   /**
    * The inverse of getCoursePrivileges -> converts an object into a number
    * @param {object} actions 
    */
   getCoursePrivilegeNumber(actions) {
      let privilege = 0;

      if (actions[this.PRIVILEGES.is_pending] === true) {
         privilege = privilege | 1;
      }
      if (actions[this.PRIVILEGES.can_submit_assignment] === true) {
         privilege = privilege | 2;
      }
      if (actions[this.PRIVILEGES.can_modify_course] === true) {
         privilege = privilege | 4;
      }
      if (actions[this.PRIVILEGES.can_grade_assignment] === true) {
         privilege = privilege | 8;
      }
      return privilege;
   }

   /**
 * Returns all courses that the currently logged in user is taking
 */
   async getCoursesForUser(user_id) {
      if (user_id === 1) {
         return [{
            course_id: 1,
            course_role: 1,
            id: 1,
            is_active: 1,
            is_deleted: 0,
            name: "CS 211",
            school_id: 1,
            term: "Spring",
            user_id: 1,
            year: 2019
         }];
      }

      return [];
      
   }

   /**
    * Returns all users attached to a particular course.  Note that caller needs to be
    * logged in and have instructor rights on the supplied course
    * @param {Number} course_id 
    */
   getCourseUsers(course_id) {

   }

   removeUser(course_id, user_id) {

   }

   setCourseRole(course_id, user_id, role) {

   }
}

export { CourseMock };
export default CourseMock;