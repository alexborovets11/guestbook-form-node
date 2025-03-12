/*import express from 'express';

const app = express();

app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}) */

import express from 'express';
import mariadb from 'mariadb';
import validateForm from './services/validation.js';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'guestbook',
    port: '3306'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`)
    }
}

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Add EJS
app.set('view engine', 'ejs');

const PORT = 3000;

// Store guestbook submissions in memory
//const guestbookEntries = [];

// Home page route
app.get('/', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});

app.get('/admin/guestbook', async (req, res) => {
    const conn = await connect();
    const guestbookEntries = await conn.query('SELECT * FROM contacts');
    res.render('admin', { guestbookEntries });
});

// Handle form submission
app.post('/submit-contact', async (req, res) => {
    //if (!req.body['first-name'] || !req.body['last-name'] || !req.body.email) {
    //    return res.send('Invalid Input: All fields are required.');
    //}
    const entry = {
        firstName: req.body['first-name'],
        lastName: req.body['last-name'],
        jobTitle: req.body['job-title'],
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailingList: req.body['mailing-list'] ? 'Yes' : 'No',
        emailFormat: req.body['email-format'],
        timestamp: new Date()
    };

    // Store the entry
    //guestbookEntries.push(entry);

    //console.log(guestbookEntries);

    // Redirect to confirmation page
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);

    const result = validateForm(entry);
    if (!result.isValid) {
        return res.send(result.errors);
    }

    const conn = await connect();

    const insertQuery = `INSERT INTO contacts 
        (firstName, lastName, jobTitle, company, linkedin, email, meet, other, message, mailingList, emailFormat, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        entry.firstName, entry.lastName, entry.jobTitle, entry.company,
        entry.linkedin, entry.email, entry.meet, entry.other,
        entry.message, entry.mailingList, entry.emailFormat, entry.timestamp
    ];

    await conn.query(insertQuery, values);

    res.render('confirmation', { entry });
});

app.get('/confirmation', (req, res) => {
    res.render('confirmation');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
