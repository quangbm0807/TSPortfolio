import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
}