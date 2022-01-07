const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/' + process.env.MONGODB_DB);
mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.slyww.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`)
.then(()=> console.log('MongoDB connected....'))
.catch((err) => console.log(err));

const db=mongoose.connection;

db.on('error', console.error.bind(console,'error in connecting mongodb'));

db.once('open',function(){
    console.log('Connected to Database:: Mongodb');
});

module.exports=db;
