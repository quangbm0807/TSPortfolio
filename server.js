import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';
import path from 'path';
import nodemailer from 'nodemailer';

// Replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// GitHub Contributions endpoint
app.get('/api/github-contributions', async (req, res) => {
  try {
    const { username = 'quangbm0807' } = req.query;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is not set');
    }

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const to = new Date();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString()
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub API error: ${error}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Get form data from request body
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: Boolean(process.env.EMAIL_SECURE === 'true'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Current date for email signature
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create email content with improved styling for admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'buiminhquang2002@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New message from your website'}`,
      html: `
                <h3>New message from your portfolio website</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});