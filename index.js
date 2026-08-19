const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
console.log(process.cwd());
console.log('MONGO_URL =', process.env.MONGO_URL);

const app=express();

//middleware
app.use(express.json());

//Connecting to the database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('successfully connected to MongoDB'))
.catch(err=>console.error('MongoDB connection error', err));

//Route
const todoRouter=require('./routes/ToDoRoute');
app.use('/api/todo', todoRouter);

//Global Error Handling Middleware
app.use((err, req, res, next)=>{
    console.error('Unexpected error:',err.message); //Log only the message
    res.status(500).json({error: 'Internal Server Error'});
});

//Start server
const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});