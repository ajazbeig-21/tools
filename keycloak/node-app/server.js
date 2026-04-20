require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Allow Angular dev server to call this API
app.use(cors({
  origin: 'http://localhost:4200',
  allowedHeaders: ['Authorization', 'Content-Type']
}));

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me-in-production',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: 'demo-realm',
  'auth-server-url': 'http://localhost:8080',
  'ssl-required': 'external',
  resource: 'node-client',
  'confidential-port': 0
});

app.use(keycloak.middleware());

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint — no auth required' });
});

// Authenticated users only
app.get('/api/profile', keycloak.protect(), (req, res) => {
  res.json({ message: 'Your profile', user: req.kauth.grant.access_token.content });
});

// Admin role only
app.get('/api/admin', keycloak.protect('realm:admin'), (req, res) => {
  res.json({ message: 'Admin dashboard — restricted access' });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));