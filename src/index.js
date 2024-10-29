import express from 'express';
// import Convex from 'convex';

const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// app.use(Convex.middleware());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Content Summarizer</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div class="discovery-container">
                <h1>Hello, World!</h1>
            </div>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});