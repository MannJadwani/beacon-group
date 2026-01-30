const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'data', 'cms.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
const schema = `
-- Research Reports table
CREATE TABLE IF NOT EXISTS research_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  href TEXT NOT NULL,
  image_src TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  category TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Regulatory Updates table
CREATE TABLE IF NOT EXISTS regulatory_updates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  href TEXT NOT NULL,
  image_src TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  category TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK(type IN ('reports', 'updates')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact Info table
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  phone TEXT,
  email TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reports_category ON research_reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_published ON research_reports(published_at);
CREATE INDEX IF NOT EXISTS idx_updates_category ON regulatory_updates(category);
CREATE INDEX IF NOT EXISTS idx_updates_published ON regulatory_updates(published_at);
`;

db.exec(schema);

// Insert default categories
const defaultCategories = [
  { name: 'AIF', type: 'reports' },
  { name: 'Securitization', type: 'reports' },
  { name: 'AIF', type: 'updates' },
  { name: 'Debenture Trustee', type: 'updates' },
  { name: 'Investor Grievances', type: 'updates' },
  { name: 'Board Meetings', type: 'updates' },
  { name: 'Others', type: 'updates' }
];

const insertCategory = db.prepare(`
  INSERT OR IGNORE INTO categories (id, name, type) 
  VALUES (lower(hex(randomblob(16))), ?, ?)
`);

for (const cat of defaultCategories) {
  insertCategory.run(cat.name, cat.type);
}

// Insert default contact info
const insertContact = db.prepare(`
  INSERT OR IGNORE INTO contact_info (id, phone, email) 
  VALUES (1, ?, ?)
`);
insertContact.run('+91 8451844276', 'research@beacontrustee.co.in');

console.log('Database initialized successfully at:', DB_PATH);
console.log('Tables created: research_reports, regulatory_updates, categories, contact_info');

db.close();
