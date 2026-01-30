# Beacon CMS

Content Management System for Beacon Trusteeship research content.

## Overview

This CMS manages the research page content for the Beacon Trusteeship website. It provides:

- REST API for fetching research data
- Admin dashboard for managing content
- SQLite database for data storage

## Data Structure

The CMS manages:

1. **Research Reports** - Long-form analysis reports
   - Title, link URL, image URL, category, view count

2. **Regulatory Updates** - SEBI/RBI circular updates
   - Title, link URL, image URL, category, view count

3. **Categories** - Organization tags
   - Reports: AIF, Securitization
   - Updates: AIF, Debenture Trustee, Investor Grievances, Board Meetings, Others

4. **Contact Info** - Research desk contact details
   - Phone and email

## Quick Start

```bash
# Install dependencies
npm install

# Initialize database
npm run init-db

# Start development server
npm run dev
```

The server will start on port 3001:
- Admin Dashboard: http://localhost:3001/admin
- API Base URL: http://localhost:3001/api

## API Endpoints

### Get All Research Data (for frontend)
```
GET /api/research
```

Response:
```json
{
  "reports": [...],
  "updates": [...],
  "categories": {
    "reports": ["AIF", "Securitization"],
    "updates": ["AIF", "Debenture Trustee", ...]
  },
  "contact": {
    "phone": "...",
    "email": "..."
  }
}
```

### Reports
- `GET /api/reports` - List all reports
- `POST /api/reports` - Create report
- `GET /api/reports/:id` - Get single report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### Updates
- `GET /api/updates` - List all updates
- `POST /api/updates` - Create update
- `GET /api/updates/:id` - Get single update
- `PUT /api/updates/:id` - Update update
- `DELETE /api/updates/:id` - Delete update

### Contact Info
- `GET /api/contact` - Get contact info
- `PUT /api/contact` - Update contact info

## Integration with Main Website

To integrate with the main Beacon website:

1. Update the research page to fetch from the CMS API:

```typescript
// In app/research/page.tsx
async function getResearchData() {
  const res = await fetch('http://localhost:3001/api/research');
  return res.json();
}
```

2. For production, set up environment variables:

```env
CMS_API_URL=https://cms.beacontrustee.co.in/api
```

## Database

SQLite database stored in `data/cms.db`. Run `npm run init-db` to:
- Create tables
- Insert default categories
- Set default contact info

## Admin Dashboard

The admin dashboard provides:
- Dashboard with statistics
- CRUD operations for reports and updates
- Contact info management
- Real-time updates

Access at: http://localhost:3001/admin

## Production Deployment

For production:

1. Set `NODE_ENV=production`
2. Use a process manager (PM2, systemd)
3. Set up reverse proxy (nginx)
4. Configure CORS for your domain
5. Use environment variables for configuration

Example systemd service:
```ini
[Unit]
Description=Beacon CMS
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/cms
ExecStart=/usr/bin/node server.js
Environment=NODE_ENV=production
Environment=PORT=3001
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## License

PRIVATE - For Beacon Trusteeship use only