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

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Store guestbook submissions in memory
const guestbookEntries = [];

// Home page route
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/confirmation', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Handle form submission
app.post('/submit-contact', (req, res) => {
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
    guestbookEntries.push(entry);
    console.log(guestbookEntries);

    // Redirect to confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Admin route to view all submissions
app.get('/admin/guestbook', (req, res) => {
    let html = '<h1>Guestbook Entries</h1><ul>';
    for (const entry of guestbookEntries) {
        html += `<li>${entry.firstName} ${entry.lastName} - ${entry.email} - ${entry.company} - ${entry.message} - ${entry.timestamp}</li>`;
    }
    html += '</ul>';
    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
