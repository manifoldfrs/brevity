import FastHTML from 'fasthtml';
import Convex from 'convex';

const app = new FastHTML();

app.use(Convex.middleware());

app.get('/', (req, res) => {
    // Render the main page
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});