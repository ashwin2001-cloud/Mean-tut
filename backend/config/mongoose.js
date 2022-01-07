const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/' + process.env.MONGODB_DB);

const db=mongoose.connection;

db.on('error', console.error.bind(console,'error in connecting mongodb'));

db.once('open',function(){
    console.log('Connected to Database:: Mongodb');
});

module.exports=db;
