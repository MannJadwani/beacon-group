# Beacon CMS Integration

This document describes how the CMS (Content Management System) is integrated with the Beacon Trusteeship website.

## Overview

The CMS is located in the `cms/` directory and is a standalone Node.js application that manages content for the **Research page** (`/research`).

## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Beacon Website    │         │   Beacon CMS        │
│   (Next.js)         │◄────────│   (Express/SQLite)  │
│                     │  API    │                     │
│   /research         │         │   Port 3001         │
│                     │         │   /api/research     │
└─────────────────────┘         └─────────────────────┘
                                          │
                                          ▼
                                   ┌──────────────┐
                                   │  SQLite DB   │
                                   │  cms.db      │
                                   └──────────────┘
```

## CMS Features

### Data Managed

1. **Research Reports** - Long-form analysis documents
2. **Regulatory Updates** - SEBI/RBI circulars and notices
3. **Categories** - Organization tags for content
4. **Contact Info** - Research desk phone and email

### Admin Dashboard

The CMS provides an admin interface at `http://localhost:3001/admin` with:
- Dashboard with statistics
- CRUD operations for reports and updates
- Contact information management
- Real-time data updates

## Getting Started

### 1. Start the CMS

```bash
cd cms
npm install
npm run init-db  # First time only
npm run dev
```

The CMS will be available at:
- Admin Dashboard: http://localhost:3001/admin
- API: http://localhost:3001/api

### 2. Start the Main Website

In a separate terminal:

```bash
npm run dev
```

The website will fetch research data from the CMS API automatically.

## API Endpoints

### Main Endpoint (used by website)
```
GET /api/research
```

Returns all research data formatted for the frontend:
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

### Management Endpoints
- `GET/POST /api/reports` - Manage research reports
- `GET/POST /api/updates` - Manage regulatory updates
- `GET/PUT /api/contact` - Manage contact info

## Environment Variables

For production deployment, set these in the main website:

```env
# .env.local
CMS_API_URL=https://cms.beacontrustee.co.in/api
```

And in the CMS:

```env
# cms/.env
PORT=3001
NODE_ENV=production
```

## Fallback Data

The research page includes fallback data that displays if the CMS is unavailable. This ensures the page always shows content even if the CMS is down.

## Deployment

### Option 1: Same Server
Run both applications on the same server:
- Website: Port 3000 (or 80/443 with reverse proxy)
- CMS: Port 3001 (internal only)

### Option 2: Separate Servers
- Website: Deployed to Vercel/Netlify
- CMS: Deployed to a VPS or cloud instance

Update `CMS_API_URL` to point to the CMS server.

## Future Enhancements

Potential CMS improvements:
- [ ] Image upload functionality (instead of URLs)
- [ ] Rich text editor for descriptions
- [ ] User authentication for admin
- [ ] Content scheduling/publishing dates
- [ ] Analytics dashboard
- [ ] API rate limiting
- [ ] Webhook support for cache invalidation

## Troubleshooting

### CMS Connection Issues

If the website can't connect to the CMS:

1. Check if CMS is running: `curl http://localhost:3001/api/health`
2. Verify `CMS_API_URL` environment variable
3. Check CORS settings in `cms/server.js`
4. Review browser console for errors

### Data Not Updating

The research page uses Next.js data fetching with a 60-second revalidation. To see immediate updates:
- Refresh the page
- Or restart the Next.js dev server

## File Structure

```
cms/
├── server.js           # Main Express server
├── package.json        # Dependencies
├── README.md           # CMS documentation
├── .gitignore
├── admin/
│   └── index.html      # Admin dashboard UI
├── scripts/
│   └── init-db.js      # Database initialization
└── data/
    └── cms.db          # SQLite database (gitignored)
```

## Database Schema

The SQLite database includes these tables:

- `research_reports` - Research reports with title, URL, image, views
- `regulatory_updates` - Regulatory updates with title, URL, image, views
- `categories` - Category tags for organizing content
- `contact_info` - Research desk contact information

Run `npm run init-db` anytime to reset the database with default values.