const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/keep`, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Database connected")
}).catch((error) => {
    console.log(error);
});