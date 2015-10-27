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
- localhost:8888   (using [Rdash dashboard](https://github.com/rdash/rdash-angular))
- Difficult to develop  -  need to seperate using gulp dev or do testing on python server
- LPage -- log in to display your likes/popular, Organize photos, Integrate with Pinterest
- - Need to Refactor to include server and remove gulp

## Countries
- Refactor countries project to use ui-grid, ui-router, animations, fontawesome, loading gif
- Added weather API to show info on country.html

## AuthStarter
- Extracted authorization from angular FullStack generator      (me@me.com, 444)
- - uses /home as main entry point
- - redirects after login to '/'
- - /components includes Auth, Navbar, Mongoose errors 

## BestDressed
- me, me@2me.com, 444   -  'home' (splash) -> main 
- - After Login - edit app.js (client), routes.js, login.Ctrl, home.Ctrl to adjust redirect
- *TO DO*
- Admin area
- Profile page  -  link comment posts + Looks to user  (add Details to schema)
- better Errors (ngMessages)
- filter/search options
- fix Success alert + close modal after Scrape Upload (works on regular)
- replace Alerts with Growl 
- add Polyvore/Instagram to scrapes
- users can tag/follow/share/review/categorize
- - - Modal Fix = $hide is not defined, no success/error, reset on cancel/close
- - add AWS for image uploads/scrapes
- *PAGES*
- Main   =  All Looks (ui-grid), Add Look button (modal), Filter options
- My Looks   =  all my looks + add look button
- Look  =  Image, comments, sidebar

- *Current Features*  
- Authentication, Scraping (pinterest) -> save + updates view
- Upload images, show All Looks & User Looks
- UI grid, page for Look details, Gravatar
- Details Page with ->
- - Comment area w/ schema (match to user/push on save)
- - Sidebar  =  title / name / date / show looks (most upVotes) / login to save   
- - Show Views/Likes
- Edit/Delete look on myLooks page, Upvoting Ability
- Transition animation (fix nav animation)
- Admin area = delete users/looks

## 'New Project'
- Zyring, GMaps (Scotch), Restaurant API (Lynda), TaskRab, MeanTweets
- - Use TaskRabbit bootstrap style layout


*NOTES*
fixing [invalid JSON](https://www.reddit.com/r/node/comments/2zsukj/help_understanding_bodyparser_and_why_express/) 
- if using $resource, use .query instead of .then   (example in looksAPI)
- req.body.<this> must match Key, so <this> = author in `author: $scope.user.name`
[Angular Grid](https://github.com/s-yadav/angulargrid)
[Pagination](https://github.com/michaelbromley/angularUtils)

*Issues*
- ? in User model save an array of looks to the user (async)
- - when moving to new page after save new Look won't show up (reload GET)
- - view breaks after re-loading Looks on myLooks (updating) + no Pagination / Scrolling?
- ? user can vote unlimited times - - check if user's email matches look.upVotes.user.email
- commenting  --  must be logged in

*Practice*
- Ref = smarter shopper, jabber, mean tweets, hackhall, job butler
- try req.body and pass in an object    --   get User and 'populate' something
- use findOneAndUpdate    try: $push, $in, $addToSet
