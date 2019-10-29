const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const movies = require('./movies-data-small');

const app = express();

app.get('/movie', (req, res) => {
    let results = movies.map(i=>i);
    let {genre, country, avg_vote} = req.query;

    if('genre' in req.query && !genre) {
        res.status(400).send('genre cannot be empty.');
    }
    if('country' in req.query && !country) {
        res.status(400).send('country cannot be empty.');
    }
    if('avg_vote' in req.query && !avg_vote) {
        res.status(400).send('avg_vote cannot be empty.');
    }

    if(genre) {
        genre = genre.toLowerCase();
        results = results.filter(movie => movie.genre.toLowerCase().includes(genre));
    }

    return res.json(results);
});


app.listen(8000, () => {
    console.log('Listening on 8000.');
});