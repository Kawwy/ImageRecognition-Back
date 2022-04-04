const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'root',
    database : 'imagerecognitionapp'
  }
});

const app = express();

app.use(express.json());
const database = {
	 users: [
		{
			id: '123',
			name: 'kaw',
			email: 'kaw@gmail.com',
			pass: '123',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'kee',
			email: 'kee@gmail.com',
			pass: '124',
			entries: 0,
			joined: new Date()
		}
	]
}

app.use(cors());

app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})
