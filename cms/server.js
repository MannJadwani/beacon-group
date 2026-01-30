const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data', 'cms.db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'admin')));

// Database connection
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// API Routes

// Get all research data (for frontend)
app.get('/api/research', (req, res) => {
  try {
    const reports = db.prepare('SELECT * FROM research_reports ORDER BY published_at DESC').all();
    const updates = db.prepare('SELECT * FROM regulatory_updates ORDER BY published_at DESC').all();
    const categories = {
      reports: db.prepare("SELECT name FROM categories WHERE type = 'reports'").all().map(c => c.name),
      updates: db.prepare("SELECT name FROM categories WHERE type = 'updates'").all().map(c => c.name)
    };
    const contact = db.prepare('SELECT phone, email FROM contact_info WHERE id = 1').get();

    // Transform to match frontend format
    const formattedReports = reports.map(r => ({
      title: r.title,
      href: r.href,
      imageSrc: r.image_src,
      views: r.views
    }));

    const formattedUpdates = updates.map(u => ({
      title: u.title,
      href: u.href,
      imageSrc: u.image_src,
      views: u.views
    }));

    res.json({
      reports: formattedReports,
      updates: formattedUpdates,
      categories,
      contact
    });
  } catch (error) {
    console.error('Error fetching research data:', error);
    res.status(500).json({ error: 'Failed to fetch research data' });
  }
});

// Get all reports
app.get('/api/reports', (req, res) => {
  try {
    const reports = db.prepare('SELECT * FROM research_reports ORDER BY published_at DESC').all();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single report
app.get('/api/reports/:id', (req, res) => {
  try {
    const report = db.prepare('SELECT * FROM research_reports WHERE id = ?').get(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create report
app.post('/api/reports', (req, res) => {
  try {
    const { title, href, image_src, category, views = 0 } = req.body;
    const id = require('crypto').randomUUID();
    
    db.prepare(`
      INSERT INTO research_reports (id, title, href, image_src, category, views)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, title, href, image_src, category, views);

    const report = db.prepare('SELECT * FROM research_reports WHERE id = ?').get(id);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update report
app.put('/api/reports/:id', (req, res) => {
  try {
    const { title, href, image_src, category, views } = req.body;
    
    db.prepare(`
      UPDATE research_reports 
      SET title = ?, href = ?, image_src = ?, category = ?, views = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, href, image_src, category, views, req.params.id);

    const report = db.prepare('SELECT * FROM research_reports WHERE id = ?').get(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete report
app.delete('/api/reports/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM research_reports WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all updates
app.get('/api/updates', (req, res) => {
  try {
    const updates = db.prepare('SELECT * FROM regulatory_updates ORDER BY published_at DESC').all();
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single update
app.get('/api/updates/:id', (req, res) => {
  try {
    const update = db.prepare('SELECT * FROM regulatory_updates WHERE id = ?').get(req.params.id);
    if (!update) return res.status(404).json({ error: 'Update not found' });
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create update
app.post('/api/updates', (req, res) => {
  try {
    const { title, href, image_src, category, views = 0 } = req.body;
    const id = require('crypto').randomUUID();
    
    db.prepare(`
      INSERT INTO regulatory_updates (id, title, href, image_src, category, views)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, title, href, image_src, category, views);

    const update = db.prepare('SELECT * FROM regulatory_updates WHERE id = ?').get(id);
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update update
app.put('/api/updates/:id', (req, res) => {
  try {
    const { title, href, image_src, category, views } = req.body;
    
    db.prepare(`
      UPDATE regulatory_updates 
      SET title = ?, href = ?, image_src = ?, category = ?, views = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, href, image_src, category, views, req.params.id);

    const update = db.prepare('SELECT * FROM regulatory_updates WHERE id = ?').get(req.params.id);
    if (!update) return res.status(404).json({ error: 'Update not found' });
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete update
app.delete('/api/updates/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM regulatory_updates WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Update not found' });
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY type, name').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact info
app.get('/api/contact', (req, res) => {
  try {
    const contact = db.prepare('SELECT * FROM contact_info WHERE id = 1').get();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact info
app.put('/api/contact', (req, res) => {
  try {
    const { phone, email } = req.body;
    
    db.prepare(`
      UPDATE contact_info 
      SET phone = ?, email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(phone, email);

    const contact = db.prepare('SELECT * FROM contact_info WHERE id = 1').get();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Beacon CMS server running on port ${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nClosing database connection...');
  db.close();
  process.exit(0);
});
