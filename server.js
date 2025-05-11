const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../../Admin_Panel/backend/uploads")));

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);

const homeworkRoutes = require('./routes/homeworkRoutes');
app.use('/api/student', homeworkRoutes);

// ✅ Add a test route to verify deployment works
app.get('/api/ping', (req, res) => {
  res.json({ message: "pong - deployment working Bro!" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    // ✅ Single app.listen call with 0.0.0.0
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
