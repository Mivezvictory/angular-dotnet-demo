# Angular + .NET + SQL Demo — Work Items Tracker

full-stack demo app to showcase:
- **Angular** (responsive UI, forms, API calls)
- **C# / .NET** (REST API, clean structure)
- **SQL** persistence (SQLite via EF Core)


## Features
- Create work items
- View all work items
- Update status (Open → InProgress → Done)
- Delete work items
- Health endpoint for basic service checks

## Tech Stack
**Frontend**
- Angular (standalone)
- HttpClient + Reactive Forms

**Backend**
- .NET 8 Minimal API
- Swagger/OpenAPI
- EF Core + SQLite

**Database**
- SQLite (local file)

## Repo Structure
- price-angular-dotnet-demo/
- backend/
- WorkItems.Api/
- frontend/
- workitems-ui/
- README.md
- .gitignore
- .editorconfig

## Running Locally

### Prerequisites
- .NET SDK (8.x recommended)
- Node.js (LTS recommended)
- Angular CLI (installed via `npx` is fine)

---

## Backend (.NET API)

```bash
cd backend/WorkItems.Api
dotnet restore
dotnet run
```

Swagger is available at the URL printed in the console:

```
https://localhost:<port>/swagger
```

### API Endpoints
- GET /health
- GET /api/work-items
- POST /api/work-items
- PUT /api/work-items/{id}/status
- DELETE /api/work-items/{id}


## Frontend(Angular)
```bash
cd frontend/workitems-ui
npm install
ng serve
```

Open: 
```
http://localhost:4200
```