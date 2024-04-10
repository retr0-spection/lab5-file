//create cars api using express
const express = require('express');
const app = express();



app.use(express.json());

const cars = require('./cars.json');

app.use(function (req, res, next) {
    // Allow access request from any computers
    res.header("Access-Control-Allow-Origin", "*");
    next()
})

//get all cars
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

//get car by id
app.get('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/api/cars', (req, res) => {
    console.log(req);
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});

//start app at localhost:3001
app.listen(3000, () => {
    console.log('Server started at ' + process.env.PORT);
});