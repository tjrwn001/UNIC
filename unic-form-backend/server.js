const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'https://www.uniclaboratory.com'  // your live site URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up file storage with Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle form submission
app.post('/submit', upload.fields([
  { name: 'cv' }, 
  { name: 'cover-letter' }, 
  { name: 'pubs' }
]), async (req, res) => {
  const { fullName, email, research } = req.body;

  // Set up Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'h.seok2@gmail.com',          // your Gmail address
      pass: 'zrrqdqjeobvvtovc'      // paste your app password here (no spaces)
    }
  });

  const attachments = [];

  if (req.files['cv']) {
    attachments.push({
      filename: req.files['cv'][0].originalname,
      content: req.files['cv'][0].buffer
    });
  }

  if (req.files['cover-letter']) {
    attachments.push({
      filename: req.files['cover-letter'][0].originalname,
      content: req.files['cover-letter'][0].buffer
    });
  }

  if (req.files['pubs']) {
    attachments.push({
      filename: req.files['pubs'][0].originalname,
      content: req.files['pubs'][0].buffer
    });
  }

  const mailOptions = {
    from: `"UNIC Website" <h.seok2@gmail.com>`,
    to: 'h.seok2@gmail.com', // where the submission should go
    subject: `New Application from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nResearch Interests: ${research}`,
    attachments: attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'There was an error sending your application.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
