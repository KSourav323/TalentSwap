const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/routes'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.use(express.json()); 

app.use('/api', userRoutes);

const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/TalentSwapDB")
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

///////////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
///////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
