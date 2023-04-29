var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const getEmployees = async function (req, res) {
//   let err, employeeDetails;
//   let body = req.body;
//   console.log('body: ', body);
//   [err, employeeDetails] = await to(Employee.findAll({
//     include: [{
//       model: Department,
//     },
//     {
//       model: Employee,
//       as: 'reportingManager',
//       attributes: ['id', 'firstName', 'lastName']
//     }
//     ]
//   }));
//   if (err) return ReE(res, err, 422);
//   return ReS(res, { employeeDetails });
// }
// module.exports.getEmployees = getEmployees;

const getEmployees = async function (req, res) {
  let err, response;
  [err, response] = await to(Employee.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getEmployees = getEmployees;




const createEmployee = async function (req, res) {
  let err, employeeDetails;
  let body = req.body;
  console.log('body: ', body);
  [err, employeeDetails] = await to(Employee.create(body.employee));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.createEmployee = createEmployee;


const getDepartment = async function (req, res) {
  let err, response;
  [err, response] = await to(Department.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getDepartment = getDepartment;

const getRole = async function (req, res) {
  let err, response;
  [err, response] = await to(Role.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getRole = getRole;

const bulkCreateEmployee = async function (req, res) {
  let err, employeeDetails;
  let body = req.body;
  console.log('body: ', body);
  [err, employeeDetails] = await to(Employee.bulkCreate(body.employee));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.bulkCreateEmployee = bulkCreateEmployee;

const findOrCreateEmployee = async function (req, res) {
  let err, employeeDetails;
  let body = req.body;
  console.log('body: ', body);
  [err, employeeDetails] = await to(Employee.findOrCreate({
    where: {
      email: 'boopath@centizen.com'
    },
    defaults: body.employee
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.findOrCreateEmployee = findOrCreateEmployee;

const departmentWithEmpCount = async function (req, res) {
  let err, employeeDetails;
  let body = req.body;
  console.log('body: ', body);
  [err, employeeDetails] = await to(Employee.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('departmentId')), 'Count']],
    group: ['department.id'],
    include: [{
      model: Department,
      attributes: ['name']
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.departmentWithEmpCount = departmentWithEmpCount;

const getEmployee = async function (req, res) {
  let err, employeeDetails;
  let body = req.body;
  console.log('body: ', body);
  [err, employeeDetails] = await to(Employee.findOne({
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.getEmployee = getEmployee;