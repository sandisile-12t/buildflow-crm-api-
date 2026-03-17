# BuildFlow CRM - Setup Guide

## Prerequisites

1. **Node.js** (v18+)
2. **Azure Cosmos DB Account** (SQL API)
3. **Angular CLI** (v17+)

---

## Step 1: Set up Cosmos DB

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a **Cosmos DB** account (SQL API)
3. Once created, go to **Keys** and copy:
   - URI (e.g., `https://your-account.documents.azure.com:443`)
   - Primary Key

---

## Step 2: Configure Backend

```bash
cd server

# Copy the example env file
cp .env.example .env

# Edit .env with your Cosmos DB credentials:
# COSMOS_ENDPOINT=your-cosmos-uri
# COSMOS_KEY=your-cosmos-primary-key
```

---

## Step 3: Install & Run Backend

```bash
cd server
npm install
npm start
```

The API runs on **http://localhost:3000**

---

## Step 4: Seed Database

After starting the server, seed the database with sample data:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or open in browser: `http://localhost:3000/api/seed`

---

## Step 5: Run Angular App

```bash
cd buildflow-crm
npm start
```

The app runs on **http://localhost:4200**

---

## API Endpoints

| Resource | Endpoints |
|----------|-----------|
| Tenders | GET/POST `/api/tenders`, PUT/DELETE `/api/tenders/:id` |
| Leads | GET/POST `/api/leads`, PUT `/api/leads/:id` |
| Clients | GET/POST `/api/clients`, PUT `/api/clients/:id` |
| Proposals | GET/POST `/api/proposals`, PUT `/api/proposals/:id` |
| Projects | GET/POST `/api/projects`, PUT `/api/projects/:id` |
| Site Reports | GET/POST `/api/site-reports` |
| Activities | GET/POST `/api/activities` |
| Tasks | GET/POST `/api/tasks`, PUT `/api/tasks/:id` |
| Seed | POST `/api/seed` |

---

## Troubleshooting

**CORS Errors**: The server is configured to allow all origins. If you still have issues, check the `cors` middleware in `server/src/index.js`.

**Cosmos DB Connection**: Make sure your firewall allows connections from your IP to Azure Cosmos DB.

**Empty Data**: Run the seed endpoint to populate initial data.