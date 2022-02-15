Description

An app where you can find all exhibitions and collections of museums, create new exhibitions, book and manage your tickets

MVP

Explore latest temporary exhibitions and permanent collection of your favorite museums
One app where you find all your bookings, makes trip oraganization easier
You can create museums and exhibitions
Backlog

Filter museums by city
Map of museums
Booking tickets
ROUTES:

User

POST /login

gets email and password
checks credentials
writes a user in session
POST /signup

gets email and password
compares password and password-confimation
generates password hash
saves user in database
writes a user in session private
DELETE /delete

deletes user from database and all his items in database
delete user in session.object
POST /logout

log out user, delete user in session.object
GET /is-logged-in

sends back session-user
Museum

POST /museum creates new museum
GET /museum/:id returns museum by id
PUT /museum/:id saves changes in museum
DELETE /museum/:id deletes museum
Exhibition

POST /exhibition creates new exhibition
GET /exhibition/:id get exhibition by id
PUT /exhibition/:id saves changes in exhibition
DELETE /exhibition/:id deletes exhibition
Bookings

POST /booking creates new booking
GET /booking/:id get booking by id
PUT /booking/:id saves changes in booking
DELETE /booking/:id deletes booking
Models

User model email: String, required, unique password: String, required Bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }] SavedExhibitions:[{ type: Schema.Types.ObjectId, ref: 'Exhibition' }] Created:[{ type: Schema.Types.ObjectId, ref: 'Exhibition' }]

Museum model Name: String, required Address: String City: String Coordinates: [Number] Phone: Number Exhibitions: [{ type: Schema.Types.ObjectId, ref: 'Exhibition' }] Image: [String]

Exhibition model name: String, required, unique Description: String Artist: [String] Curator: [String] BegginingDate: Date EndDate: Date Museum: { type: Schema.Types.ObjectId, ref: 'Museum' } Image: [String]

Booking model Exhibition: [{ type: Schema.Types.ObjectId, ref: 'Exhibition' }] Date: Date, required Hour: Number

Links

Notion https://www.notion.so/Museums-7f774204d58c410ab41388c726762460

Git Repo: Deploy:

Slides

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
