process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('dotenv').config();
const https = require('https');
const express = require('express');
const cors = require('cors');
const { CosmosClient } = require('@azure/cosmos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  credentials: true
}));
app.use(express.json());

// Cosmos DB Configuration
const cosmosEndpoint = process.env.COSMOS_ENDPOINT || 'https://localhost:8081';
const cosmosKey = process.env.COSMOS_KEY || 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==';
const databaseId = process.env.DATABASE_NAME || 'buildflow.db';
const containerIds = {
  tenders: 'tenders',
  leads: 'leads',
  clients: 'clients',
  proposals: 'proposals',
  projects: 'projects',
  siteReports: 'siteReports',
  activities: 'activities',
  tasks: 'tasks',
  users: 'users'
};

// Initialize Cosmos Client
const cosmosClient = new CosmosClient({
  endpoint: cosmosEndpoint,
  key: cosmosKey,
  userAgentSuffix: 'buildflow-crm',
  httpAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

const database = cosmosClient.database(databaseId);

// Helper to get container
const getContainer = (name) => database.container(containerIds[name]);

// Manual container creation endpoint
app.post('/api/containers/:name', async (req, res) => {
  try {
    const containerName = req.params.name;
    await database.containers.createIfNotExists({ id: containerName });
    res.status(201).json({ message: `Container '${containerName}' created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ===================== ROUTES =====================

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===================== TENDERS =====================
app.get('/api/tenders', async (req, res) => {
  try {
    const container = getContainer('tenders');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tenders', async (req, res) => {
  try {
    const container = getContainer('tenders');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tenders/:id', async (req, res) => {
  try {
    const container = getContainer('tenders');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tenders/:id', async (req, res) => {
  try {
    const container = getContainer('tenders');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== LEADS =====================
app.get('/api/leads', async (req, res) => {
  try {
    const container = getContainer('leads');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const container = getContainer('leads');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const container = getContainer('leads');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const container = getContainer('leads');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== CLIENTS =====================
app.get('/api/clients', async (req, res) => {
  try {
    const container = getContainer('clients');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const container = getContainer('clients');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const container = getContainer('clients');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const container = getContainer('clients');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== PROPOSALS =====================
app.get('/api/proposals', async (req, res) => {
  try {
    const container = getContainer('proposals');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/proposals', async (req, res) => {
  try {
    const container = getContainer('proposals');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/proposals/:id', async (req, res) => {
  try {
    const container = getContainer('proposals');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/proposals/:id', async (req, res) => {
  try {
    const container = getContainer('proposals');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== PROJECTS =====================
app.get('/api/projects', async (req, res) => {
  try {
    const container = getContainer('projects');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const container = getContainer('projects');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const container = getContainer('projects');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const container = getContainer('projects');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== CONTRACTS =====================
app.get('/api/contracts', async (req, res) => {
  try {
    const container = getContainer('contracts');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contracts', async (req, res) => {
  try {
    const container = getContainer('contracts');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/contracts/:id', async (req, res) => {
  try {
    const container = getContainer('contracts');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contracts/:id', async (req, res) => {
  try {
    const container = getContainer('contracts');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== SITE REPORTS =====================
app.get('/api/site-reports', async (req, res) => {
  try {
    const container = getContainer('siteReports');
    const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/site-reports', async (req, res) => {
  try {
    const container = getContainer('siteReports');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/site-reports/:id', async (req, res) => {
  try {
    const container = getContainer('siteReports');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/site-reports/:id', async (req, res) => {
  try {
    const container = getContainer('siteReports');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== ACTIVITIES =====================
app.get('/api/activities', async (req, res) => {
  try {
    const container = getContainer('activities');
    const { resources } = await container.items.query('SELECT * FROM c ORDER BY c.date DESC').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const container = getContainer('activities');
    const item = { ...req.body, date: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== TASKS =====================
app.get('/api/tasks', async (req, res) => {
  try {
    const container = getContainer('tasks');
    const { resources } = await container.items.query('SELECT * FROM c ORDER BY c.dueDate ASC').fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const container = getContainer('tasks');
    const item = { ...req.body, createdAt: new Date().toISOString() };
    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const container = getContainer('tasks');
    const { resource } = await container.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const container = getContainer('tasks');
    await container.item(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== SEED DATA =====================
app.post('/api/seed', async (req, res) => {
  try {
    // Create containers if they don't exist
    for (const containerId of Object.values(containerIds)) {
      try {
        await database.container(containerId).read();
      } catch {
        await database.containers.createIfNotExists({ id: containerId });
      }
    }

    // Seed Tenders
    const tendersContainer = getContainer('tenders');
    const tenders = [
      { id: '1', rfqNumber: 'RFQ-2026-001', projectName: 'Skyline Tower Development', client: 'Urban Development Corp', value: 45000000, status: 'technical-review', deadline: '2026-04-15', createdAt: '2026-02-01', assignedTo: '1', description: 'Commercial tower with 40 floors', probability: 65 },
      { id: '2', rfqNumber: 'RFQ-2026-002', projectName: 'Harbor View Residences', client: 'Coastal Properties Ltd', value: 28000000, status: 'pricing', deadline: '2026-04-01', createdAt: '2026-01-20', assignedTo: '2', description: 'Luxury residential complex', probability: 45 },
      { id: '3', rfqNumber: 'RFQ-2026-003', projectName: 'Tech Park Phase 2', client: 'Innovation Holdings', value: 65000000, status: 'submission', deadline: '2026-03-20', createdAt: '2026-01-10', assignedTo: '1', description: 'Industrial and office development', probability: 80 },
      { id: '4', rfqNumber: 'RFQ-2026-004', projectName: 'City Center Mall', client: 'Retail Ventures Inc', value: 35000000, status: 'evaluation', deadline: '2026-03-10', createdAt: '2025-12-15', assignedTo: '3', description: 'Shopping mall expansion', probability: 55 },
      { id: '5', rfqNumber: 'RFQ-2026-005', projectName: 'Riverside Apartments', client: 'Habitat Group', value: 18000000, status: 'won', deadline: '2026-02-28', createdAt: '2025-11-01', assignedTo: '2', description: 'Multi-family residential', probability: 100 },
    ];
    for (const tender of tenders) {
      try { await tendersContainer.items.create(tender); } catch {}
    }

    // Seed Leads
    const leadsContainer = getContainer('leads');
    const leads = [
      { id: '1', name: 'Sarah Johnson', company: 'Metro Developers', type: 'developer', source: 'referral', status: 'qualified', value: 5000000, createdAt: '2026-01-15', lastContact: '2026-03-10', assignedTo: '1', notes: 'Interested in commercial developments' },
      { id: '2', name: 'Michael Chen', company: 'Modern Architecture Studio', type: 'architect', source: 'website', status: 'proposal', value: 2500000, createdAt: '2026-02-01', lastContact: '2026-03-08', assignedTo: '2', notes: 'Looking for contractor partnership' },
      { id: '3', name: 'David Williams', company: 'City Planning Dept', type: 'municipal', source: 'partner', status: 'new', value: 0, createdAt: '2026-03-01', lastContact: '2026-03-01', assignedTo: '3', notes: 'Municipal project coordinator' },
    ];
    for (const lead of leads) {
      try { await leadsContainer.items.create(lead); } catch {}
    }

    // Seed Clients
    const clientsContainer = getContainer('clients');
    const clients = [
      { id: '1', name: 'Robert Taylor', company: 'Urban Development Corp', type: 'developer', email: 'r.taylor@urbandev.com', phone: '+27 11 123 4567', address: '123 Business Park, Sandton', contactPerson: 'Robert Taylor', projects: ['1'], createdAt: '2024-01-15', rating: 4.5 },
      { id: '2', name: 'Amanda White', company: 'Coastal Properties Ltd', type: 'developer', email: 'a.white@coastalprop.co.za', phone: '+27 21 234 5678', address: '45 Waterfront Drive, Cape Town', contactPerson: 'Amanda White', projects: ['2'], createdAt: '2024-03-20', rating: 4 },
      { id: '3', name: 'Paul Meyer', company: 'Modern Architecture Studio', type: 'architect', email: 'paul@modernarch.co.za', phone: '+27 31 345 6789', address: '78 Design District, Durban', contactPerson: 'Paul Meyer', projects: [], createdAt: '2024-06-10', rating: 5 },
    ];
    for (const client of clients) {
      try { await clientsContainer.items.create(client); } catch {}
    }

    // Seed Projects
    const projectsContainer = getContainer('projects');
    const projects = [
      { id: '1', name: 'Skyline Tower Development', client: 'Urban Development Corp', location: 'Sandton, Johannesburg', value: 45000000, status: 'active', startDate: '2026-03-01', endDate: '2028-06-30', manager: 'John Smith', progress: 15 },
      { id: '2', name: 'Harbor View Residences', client: 'Coastal Properties Ltd', location: 'Cape Town', value: 28000000, status: 'planning', startDate: '2026-04-01', endDate: '2027-12-31', manager: 'Sarah Lee', progress: 5 },
    ];
    for (const project of projects) {
      try { await projectsContainer.items.create(project); } catch {}
    }

    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 BuildFlow CRM API running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});