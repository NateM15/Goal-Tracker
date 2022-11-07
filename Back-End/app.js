const express = require('express');
const app = express();
const cors = require('cors');

const {Pool} = require('pg');

const config = require('./config.js')["dev"]
const PORT = config.port;

const pool = new Pool({
    connectionString: config.connectionString
});
pool.connect();

app.use(cors());
app.use(express.json())

//Sets up an endpoint to get data from the goals datatable
app.get('/api/goals', (req, res) => {
    pool.query('SELECT * FROM goals RIGHT OUTER JOIN goal_type ON goal_type_id = id WHERE goal_type_id = id ORDER BY goal_id ASC')
    .then(result => res.send(result.rows))
    .catch(error => console.error(error))
})

app.get('/api/current-goal', (req, res) => {
    pool.query('SELECT * FROM current_goal')
    .then(result => res.send(result.rows))
    .catch(error => console.error(error))
})

//Sets up an endpoint that allows goals to be created
app.post('/api/create/:id', (req, res) => {
    let goal = req.body;
    let id = req.params.id
    pool.query(`INSERT INTO goals (goal, goal_type_id) VALUES ($1, $2) RETURNING *`, [goal.goal, id])
    .then(result => res.status(201).send(result.rows))
    .catch(res.status(400))
})

//Allows user to set their current goal
app.patch('/api/update', (req, res) => {
    let info = req.body
    pool.query('UPDATE current_goal SET goal = $1, goal_id = $2 WHERE id = 1', [info.goal, info.goal_id])
    .then(result => res.status(201).send('Succesful Patch'))
    .catch(error => res.send(error))
})

//Allows user to delete a goal, sends a delete query
app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id
    pool.query('DELETE FROM goals WHERE goal_id = $1', [id])
    .then(result => res.status(201).send(result))
    .catch(error => res.send(error))
})

app.listen(PORT, () => {
    console.log(`Listening in on ${PORT}`)
})