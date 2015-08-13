All-Inclusive Repo for new & interesting projects

- Dashboards for instaG/facebook/twitter
- CRUD style using MEAN 
- Implementation of various API's
- Solidify concepts + my own styling
- Practicing of 'best practice' techniques 

## User Report
- Features = Login (bcrypt), POST/GET user reports, show 12 reports, filter by member, must log in to post
- - Angular  --  $http, $alert, ui-router
- - Node  --  mongoose, API routing, passport
- `Views`
- *Index* : list of reports + search/filter, Login
- *Form* : add new reports
- *Admin* : area to manage reports and message users
- I want?  -- DB seperated, API clearly defined
- `Models`  =  Users [admin,agents], Notes
**App Setup**
- express, bowerrc, switch to html/public, remove jade for ejs, add nodemon, test view, config/db
- express-session, passport/local, bcryptjs
- angular, bootstrap, ui-bootstrap, ui-router
- setup angular + test index, test server controllers
- Register and Login front and back   -  me1@me.com, 11
$alert  -  use the 'container' to trigger in div ID but does work when used with $state.go('new');
- `Bugs`: allows user login w/ wrong password
- - Used 'success' instead of 'then' to display all notes on home.html

## InstaDash
- localhost:8888
- LPage -- log in to display your likes/popular, Organize photos, Integrate with Pinterest
