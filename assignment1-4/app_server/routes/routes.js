var express = require('express');
var router = express.Router();


const controller = require('../controller/main');
const usercontroller = require('../controller/user');
const usercontroller = require('../controller/user');
const authentication = require('../controller/auth');

router.get('/', controller.getLoginPage); // initial page
router.get('/home', authentication.isValidUser, controller.getHomePage); // get Register
router.get('/register', controller.getRegisterPage); // get Register Page
router.post('/register', controller.submitRegisterForm); //  Register submit
router.get('/locate', authentication.isValidUser, controller.getLocatePage); // get Locate Page
router.get('/upload', authentication.isValidUser, controller.uploadResume); // upload Resume
router.get('/login', controller.getLoginPage); // get Login Page
router.post('/login', controller.submitLoginForm); // login submit
router.get('/logout', authentication.logoutUser); // logout
router.get('/jobtrack', controller.getJobTrack); // check tab
router.get('/schedule', controller.getSchedulePage); // schedule company visit
router.get('/stickynotes', controller.getStickyNotes); // schedule company visit
router.get('/users',authentication.isValidUser, usercontroller.getUsers); // get list of users
router.get('/users/:email',authentication.isValidUser, usercontroller.getOneUser); // get one user
router.put('/users/:email',authentication.isValidUser, usercontroller.updateUser); // update one user
router.get('/company', controller.getCompanyPage); // get company page
router.post('/company/postajob', controller.submitJobForm); // post a job
router.get('/company/jobs', controller.getCompanyJobPosts); // get company jobs
router.post('/company/job/description', controller.updateJobDescription); // update job desc
router.get('/getInformation', controller.getInformation); // get user information

module.exports = router