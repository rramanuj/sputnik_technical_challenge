Hey, welcome to Web-Scraper!


To run this thing:
1. npm install (to grab all the necessary libraries and packages)
2. Ensure ports 8080 & 3000 are free (if you're running the server & client on the same machine)
3. npm start (to kick off the server)
4. cd into client/web_scraper
5. npm run dev** (to start the client & the magic begins)


localhost:8080 <-- Front End (if you want to throw requests conventionally)
localhost:3000/api <-- server/API address (if you want to throw requests via postman)

To run the tests
1. (after installing mocha/chai/chai-http/should/etc)
2. npm run test

** used vue.js for the front end template, don't forget to install the vue.js npm dependencies aswell (axios etc), a 'npm install' whilst cd'ed in the client directory will sort all that out.
