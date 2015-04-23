
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , router = require('./routes/router')
  , http = require('http')
  , path = require('path')
  , MemoryStore = new express.session.MemoryStore()
  , after_login = require('./routes/makerequestrouter/login')
  , sign_up = require('./routes/makerequestrouter/signUp')
  , userInfo = require('./routes/makerequestrouter/getUserInfo')
  , userEducationInfo = require('./routes/makerequestrouter/getUserEducationInfo')
  , userExperienceInfo = require('./routes/makerequestrouter/getUserExperienceInfo')
  , userSkillInfo = require('./routes/makerequestrouter/getUserSkillInfo')
  , updateUserBasicInfo = require('./routes/makerequestrouter/updateUserInfo')
  , updateUserEducationInfo = require('./routes/makerequestrouter/updateUserEducationInfo')
  , updateUserExperienceInfo = require('./routes/makerequestrouter/updateUserExperienceInfo')
  , updateLastLogin = require('./routes/makerequestrouter/updateLastLogin')
  , addUserEducationDetail = require('./routes/makerequestrouter/addUserEducationDetail')
  , addUserExperienceDetail = require('./routes/makerequestrouter/addUserExperienceDetail')
  , addUserSkill = require('./routes/makerequestrouter/addUserSkill')
  , getSearchResults = require('./routes/makerequestrouter/getSearchResult')
  , getConnectedPeopleList = require('./routes/makerequestrouter/getConnectedPeopleList')
  , getPendingConnectionsList = require('./routes/makerequestrouter/getPendingConnectionsList')
  , acceptConnectionRequest = require('./routes/makerequestrouter/acceptConnectionRequest')
  , sendConnectionRequest = require('./routes/makerequestrouter/sendConnectionRequest')
  , signout = require('./routes/makerequestrouter/signOut');

var app = express();

// all environments
app.set('port', process.env.PORT || 3232);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	  store : MemoryStore,
	  secret: 'random_string_goes_here',
	  duration: 60 * 1000
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular_controller',  express.static(__dirname + '/angular_controller'));
app.use('/routes',  express.static(__dirname + '/routes'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(app.router);
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:7272');
	res.header('Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept');
	res.header("Access-Control-Allow-Credentials", true);
	if (req.method === "OPTIONS") {
		console.log("Client options");
		res.end('');
	} else {
		next();
	}
});

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

function restrict(req, res, next) {
console.log("token : "+req.session.token);
  if (req.session.token) {
	  console.log("User Ok");
	  next();
  } else {
	console.log(".....401.....");
    req.session.error = 'Access denied!';
    res.end('401');
  }
}

//get Request
app.get('/', routes.index);
//get login page
app.get('/login', login.login);
//successful login page (User Profile)
app.get('/successLogin', login.successLogin);
//connection search result page
app.get('/connectionSearchResult', router.connectionSearchResult);
//connections page
app.get('/connections', router.connections);

//get User Information
app.get('/userInfo', restrict, userInfo.getuserInfo);
//get User Education Information
app.get('/educationdetails', restrict, userEducationInfo.getUserEducationInfo);
//get User Experience Information
app.get('/experienceDetails', restrict, userExperienceInfo.getUserExperienceInfo);
//get user skill info
app.get('/skillDetails', restrict, userSkillInfo.getUserSkillInfo);
//get connected people list
app.get('/connectedPeopleList', restrict, getConnectedPeopleList.getConnectedPeopleList);
//get pending connections people list
app.get('/pendingConnections', restrict, getPendingConnectionsList.getPendingConnectionsList);
//sign out
app.get('/signOut', restrict, signout.signout);

// post request
//login request
app.post('/login', after_login.after_login);
//signup request
app.post('/signUp', sign_up.signUpNewUser);
//update Basic Info
app.post('/updateUserBasicInfo', updateUserBasicInfo.updateUserBasicInfo);
//update Education Info
app.post('/updateUserEdu', updateUserEducationInfo.updateUserEducationInfo);
//update Experience Info
app.post('/updateUserExp', updateUserExperienceInfo.updateUserExperienceInfo);
//add Education detail
app.post('/addEducationDetail', addUserEducationDetail.addUserEducationDetail);
//add Experience Detail
app.post('/addExperienceDetail', addUserExperienceDetail.addUserExperienceDetail);
//add user skill
app.post('/addSkillDetail', addUserSkill.addUserSkill);
//get search Result
app.post('/userList', getSearchResults.getSearchResult);
// accept connection request
app.post('/acceptInvitation', acceptConnectionRequest.acceptConnectionRequest);
// send conenction request
app.post('/sendConnectionRequest', sendConnectionRequest.sendConnectionRequest);
// Update Last Login
app.post('/updateLastLogin', updateLastLogin.updateLastLogin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
