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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});