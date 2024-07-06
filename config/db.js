const { default: mongoose } = require("mongoose");

const db=mongoose.connect(`mongodb://localhost:27017/TestOtp`).then(()=>{
    console.log("database connected👍👍💕");
}).catch((err)=>{
    console.log("database error😫😫😫");
})