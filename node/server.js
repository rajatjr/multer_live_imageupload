const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
app.use(cors());
// Serve static files
app.use(express.static('public'));

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  return res.json({ filename: req.file.filename });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
