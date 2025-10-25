const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://11.0.1.4', 'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP
    credentials: true // Allow credentials
}))

// Test route to check if the server is running
app.get('/test', (req, res)=>{
    res.status(200).json({message: "Test successful!"});
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

connectToMongo();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
