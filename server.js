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
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .email-container { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
            .email-header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .email-body { padding: 20px; background-color: #fff; }
            .email-footer { background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
            h2 { color: #4F46E5; margin-top: 0; }
            .info-item { margin-bottom: 15px; }
            .info-label { font-weight: bold; color: #555; }
            .message-box { background-color: #f5f7ff; border-left: 3px solid #4F46E5; padding: 15px; margin-top: 15px; border-radius: 0 4px 4px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>New Portfolio Contact Message</h1>
            </div>
            <div class="email-body">
              <h2>You've received a new message</h2>
              
              <div class="info-item">
                <p class="info-label">From:</p>
                <p>${firstName} ${lastName}</p>
              </div>
              
              <div class="info-item">
                <p class="info-label">Email:</p>
                <p><a href="mailto:${email}">${email}</a></p>
              </div>
              
              <div class="info-item">
                <p class="info-label">Subject:</p>
                <p>${subject || 'N/A'}</p>
              </div>
              
              <div class="info-item">
                <p class="info-label">Message:</p>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div class="email-footer">
              <p>This message was sent from your portfolio contact form on ${currentDate}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Create confirmation email to send to the user
    const userConfirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Thank you for your message, ${firstName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .email-container { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
            .email-header { background: linear-gradient(135deg, #4F46E5, #7C3AED); color: white; padding: 30px; text-align: center; }
            .logo { width: 80px; height: 80px; background-color: white; border-radius: 50%; margin: 0 auto 15px; padding: 15px; }
            .email-body { padding: 30px; background-color: #fff; }
            .email-footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
            h2 { color: #4F46E5; margin-top: 0; }
            p { margin-bottom: 15px; }
            .button { display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: bold; margin-top: 15px; }
            .social-links { margin-top: 20px; }
            .social-link { display: inline-block; margin: 0 10px; color: #4F46E5; text-decoration: none; font-weight: bold; }
            .message-summary { background-color: #f5f7ff; border-left: 3px solid #4F46E5; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <div style="font-size: 48px; text-align: center; margin-bottom: 10px;">🚀</div>
              <h1>Message Received</h1>
            </div>
            <div class="email-body">
              <h2>Dear ${firstName},</h2>
              
              <p>Thank you for reaching out to me through my portfolio website. I appreciate your interest and have received your message.</p>
              
              <div class="message-summary">
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Message preview:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
              </div>
              
              <p>I will review your message and get back to you as soon as possible. Typically, I respond within 1-2 business days.</p>
              
              <p>In the meantime, please feel free to check out my other projects on GitHub or LinkedIn.</p>
              
              <div style="text-align: center;">
                <a href="https://github.com/quangbm0807" class="button" style="color: white;">Visit My GitHub</a>
              </div>
              <div class="social-links" style="text-align: center;">
                <a href="https://github.com/quangbm0807" class="social-link">GitHub</a> | 
                <a href="https://www.linkedin.com/in/quang-bui-minh-626724316" class="social-link">LinkedIn</a> | 
                <a href="https://bminhquang.name.vn" class="social-link">Portfolio</a>
              </div>
            </div>
            <div class="email-footer">
              <p>© ${new Date().getFullYear()} Bui Minh Quang. All rights reserved.</p>
              <p>If you did not submit this contact form, please disregard this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails - both to admin and confirmation to user
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userConfirmationMailOptions)
    ]);

    // Return success response
    return res.status(200).json({ success: true, message: 'Messages sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});