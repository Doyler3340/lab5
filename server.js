// Import the Express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port number the server will listen on
const port = 3000;

// Error-handling middleware: catches any errors in the app and logs them to the console.
// Responds with a 500 (Internal Server Error) status and a message.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Import the body-parser middleware to handle form data
const bodyParser = require('body-parser');

// Configure body-parser to parse URL-encoded data (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page ("/").
// Responds with a welcome message.
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying');
});

// Define a route with a dynamic parameter (:name).
// Responds with a greeting that includes the name provided in the URL.
app.get('/hello/:name/', (req, res) => {
    const name = req.params.name; // Extract the name from the URL parameters
    res.send('Hello ' + name); // Send the response with the name
});

// Define a route for "/api/movies" that returns a list of movie data in JSON format.
// The response includes a 201 status code indicating the resource was successfully created.
app.get('/api/movies', (req, res) => {
    const myMovies = [ // Define a list of movie objects
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies }); // Send the movies as a JSON response with a 201 status code
});

// Import the 'path' module to work with file paths
const path = require('path');

// Define a route that serves an HTML file (index.html) to the client.
// The __dirname is the directory where the current script is located.
app.get('/index', (req, res) => {
    res.sendFile(__dirname + "/index.html"); // Send the index.html file located in the project directory
});

// Define a route with two dynamic parameters (:firstName and :lastName).
// Responds with a greeting that includes both the first and last name provided in the URL.
app.get('/hello/:firstName/:lastName', (req, res) => {
    const { firstName, lastName } = req.params; // Destructure firstName and lastName from URL parameters
    res.send('Hello ' + firstName + ' ' + lastName); // Send a greeting using both names
});

// Define a POST route for "/name".
// Extracts the first and last name from the request body (form data) and responds with a goodbye message.
app.post('/name', (req, res) => {
    const firstname = req.body.firstname; // Extract first name from the form data
    const lastname = req.body.lastname;   // Extract last name from the form data
    res.send(`Goodbye ${firstname} ${lastname}`); // Send a goodbye message using the names
});

// Define a GET route for "/name".
// Extracts the first and last name from the query string and responds with a hello message.
app.get('/name', (req, res) => {
    const firstname = req.query.firstname; // Extract first name from query string
    const lastname = req.query.lastname;   // Extract last name from query string
    res.send(`Hello ${firstname} ${lastname}`); // Send a hello message using the names
});

// Start the server and listen on the defined port.
// Log a message to the console once the server is running.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
