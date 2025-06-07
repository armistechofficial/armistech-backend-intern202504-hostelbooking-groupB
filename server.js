import express from "express";
const app = express();
const port = 7000;
//app.get(para1, para2, para3) where first is blank path, second and third is the function run in the path i.e. 
//request and response
app.get('/', (req, res) => {
    res.send('Welcome to Hostel Booking!')
  })

//listens to the port 
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })