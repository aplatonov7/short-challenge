# Shooooort - the link shortener with a long name

Based on [this boilerplate](https://github.com/heartless7/react-redux-boilerplate).

Developed and tested in chrome 51.0.2704.103 m.

## Setup instructions

1. To install dependencies run "npm i"
2. To run the project use one of the following commands:
  * "npm run dev" to run in development mode
  * "npm start" to build and run in production mode

## Main idea and how to use this thing

The way I structured code in this project is pretty common:
* "components" and "containers" folders for React presentational/stateful components
* "redux" for Redux setup and modules (ducks)
* "styles" for general styling stuff - global styles, fonts, SASS mixins and variables
* "utils" for other stuff, such as formatters, validation and api

The app mostly consists of two main parts - UrlForm and UrlList.

For UrlForm I used great redux-form module with some custom validation. I also added shortcode field to the form,
since it is supported by the API and well, why not.

For UrlList - all the links, created by user, are saved to localStorage. Then, on UrlList load action they are retrieved
from localStorage and their stats are updated via API /stats route (one link at a time, which is definitely not ideal).
If any of the /stats request fail, the error is displayed for the whole list (the way it would have been if it was one
singular request). Clear history resets links part of the state to initialState and clears localStorage.

app/config.js file contains API_URL variable, which is used for both client-side url composition and server-side proxy
setup.