const sqlite3 = require('sqlite3').verbose();

class AssignmentsDb {

   constructor(db_connection) {
      this.db = db_connection;
   }

   /**
    * Determines whether or not the supplied user is attached to the supplied assignment
    * @param {*} assignment_id 
    * @param {*} user_id 
    */
   has_user(assignment_id, user_id, callback){
      const sql = "SELECT a.id FROM assignments a " +
                  " INNER JOIN course_users cu ON a.course_id = cu.course_id " +
                  " WHERE user_id = $user_id AND a.id = $assignment_id " +
                  " LIMIT 1";
      const params = {$user_id: user_id, $assignment_id: assignment_id};
      let result = this.db.get(sql, params, (err, row) => {
         if(typeof(callback) !== "function"){
            callback = function(x, y){};
         }
         if (err === null && row !== undefined) {
            callback(true, null);
         }
         else{
            callback(false, err);
         }
      });
   }
}

exports.createAssignmentsDb = function (db_connection) {
   return new AssignmentsDb(db_connection);
}