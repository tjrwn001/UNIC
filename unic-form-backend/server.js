const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'https://www.uniclaboratory.com'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle form submissions
app.post('/apply', upload.fields([
  { name: 'cv' },
  { name: 'cover-letter' },
  { name: 'pubs' }
]), async (req, res) => {
  const { fullName, email, research } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'h.seok2@gmail.com',
      pass: 'zrrqdqjeobvvtovc'
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
    from: '"UNIC Website" <h.seok2@gmail.com>',
    to: 'zhiwei.jiang@ntu.edu.sg',
    subject: `New Application from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nResearch Interests: ${research}`,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'There was an error sending your application.' });
  }
});

// ...your existing /apply route above...

// ⬇️ Paste this block right before app.listen()
app.post('/contact', express.urlencoded({ extended: true }), async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'h.seok2@gmail.com',
      pass: 'zrrqdqjeobvvtovc'
    }
  });

  const mailOptions = {
    from: `"Contact Form" <h.seok2@gmail.com>`,
    to: 'zhiwei.jiang@ntu.edu.sg',
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'There was an error sending your message.' });
  }
});

// ✅ Your server listen stays at the very bottom
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
