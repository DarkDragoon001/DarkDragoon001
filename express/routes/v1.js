var express = require('express');
var router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })
});
router.post('/login', UserAccountController.login);
router.post('/refreshToken', UserAccountController.refreshToken);

// 
router.get('/getEmployees', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployees);
router.post('/createEmployee', EmployeeController.createEmployee);
router.post('/getEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployee);

router.post('/bulkCreateEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.bulkCreateEmployee);
router.post('/findOrCreateEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.findOrCreateEmployee);
router.get('/departmentWithEmpCount', passport.authenticate('jwt', { session: false }), EmployeeController.departmentWithEmpCount);


router.get('/getDepartment', passport.authenticate('jwt', { session: false }), EmployeeController.getDepartment);
router.get('/getRole', passport.authenticate('jwt', { session: false }), EmployeeController.getRole);


module.exports = router;
