const express = require('express');
const app = express();
const connectDB = require('./db/connection')
require('dotenv').config();
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');
const port = process.env.PORT || 3000;

//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(notFound);
app.use(errorHandlerMiddleware);

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