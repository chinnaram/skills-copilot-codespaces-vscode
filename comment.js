// Create a web server with express that has the following routes:
// - GET /comments - returns a list of comments
// - POST /comments - create a new comment
// - PUT /comments/:id - update a comment
// - DELETE /comments/:id - delete a comment
// - GET /comments/:id - get a single comment
// The comment object should have the following structure: { id: 1, body: 'text' }
// The id should be a unique identifier for the comment (a number)
// The body should be a string

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let comments = [
    { id: 1, body: 'This is the first comment' },
    { id: 2, body: 'This is the second comment' }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.json(comment);
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    comment.body = req.body.body;
    res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    res.json(comment);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});







