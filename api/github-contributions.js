// api/github-contributions.js
export default async function handler(req, res) {
    try {
        // Lấy tên người dùng từ query params hoặc sử dụng mặc định
        const { username = 'quangbm0807' } = req.query;

        // Đảm bảo GITHUB_TOKEN được thiết lập trong biến môi trường
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN environment variable is not set');
        }

        // Truy vấn GraphQL
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

        // Tính toán thời gian một năm trước
        const to = new Date();
        const from = new Date();
        from.setFullYear(from.getFullYear() - 1);

        // Gọi GitHub GraphQL API
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

        // Trả về dữ liệu cho client
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in GitHub contributions API:', error);
        return res.status(500).json({ error: error.message });
    }
}