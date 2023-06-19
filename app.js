const express = require('express');
const app = express();
const connectDB = require('./db/connection');
const cors = require('cors');
require('dotenv').config();
const tasks = require('./routes/tasks');
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());


//routes
app.use("/api/v1/tasks", tasks.routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server started on port : ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()

module.exports = app;