# 🧵 Customs — Design It. Build It. Wear It.

> A made-to-order fashion and footwear platform connecting customers with local tailors and craftsmen.

Customs lets users design their own clothing by selecting a garment, choosing a style, cloth and colour,
entering their exact measurements, and submitting a custom order. The order is broadcast to
registered local tailors who accept and fulfil it to specification.

---

## 👥 Team Setup

This project is split across two developers working on different laptops.

| Role | Responsibility | Folder |
|------|---------------|--------|
| Frontend Developer | React UI, screens, API calls | `frontend/` |
| Backend Developer | Spring Boot API, MySQL database | `backend/` + `database/` |

Both developers share the same GitHub repository. Each person only runs
their part on their own laptop. They communicate over the same WiFi network
or a deployed server.

---

## ✨ Features

### Customer Side
- Browse categories — Shirt, Pants, Kurta, Shoes, Blazer, Dress
- Choose from curated style models per category
- Pick colour from swatches
- Enter exact body measurements (fields adapt per category)
- Add special instructions
- Review full order before submission
- Live 4-step order tracker — Placed → Accepted → In Production → Ready

### Tailor Side
- Register with name, location, and speciality
- Receive order requests with full specifications
- Accept or decline orders
- Update order progress stages
- Build reputation through customer ratings

---

## 🛠️ Tech Stack

| Layer      | Technology              | Developer        |
|------------|-------------------------|------------------|
| Frontend   | React.js                | Frontend Dev     |
| Backend    | Java Spring Boot        | Backend Dev      |
| Database   | MySQL                   | Backend Dev      |
| Auth       | Spring Security + JWT   | Backend Dev      |
| API Style  | REST                    | Both             |

---

## 📁 Project Structure

```
customs/
├── frontend/                  # React application (Frontend Dev)
│   ├── public/
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── pages/             # Screen-level components
│       ├── services/          # API call functions
│       ├── context/           # Global state (auth, orders)
│       └── assets/            # Images, fonts, icons
│
├── backend/                   # Spring Boot application (Backend Dev)
│   └── src/main/java/com/customs/
│       ├── controller/        # REST API endpoints
│       ├── service/           # Business logic
│       ├── repository/        # Database queries (JPA)
│       ├── model/             # Entity classes
│       └── config/            # Security, CORS config
│
├── database/
│   ├── schema.sql             # Table definitions
│   └── seed.sql               # Sample data
│
├── docs/                      # Design doc, wireframes, logo
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

### Core Tables

```sql
customers     — customer accounts and contact info
tailors       — tailor profiles, location, speciality, rating
orders        — order records linking customer to tailor
measurements  — per-field measurement values per order
```

### Order Status Flow

```
PLACED → ACCEPTED → IN_PRODUCTION → READY → DELIVERED
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Who Needs It |
|------|---------|--------------|
| Node.js | v18+ | Frontend Dev |
| Java JDK | 17 or 21 | Backend Dev |
| Maven | 3.8+ | Backend Dev |
| MySQL | 8.0+ | Backend Dev |
| Git | Latest | Both |

---

## 💻 Frontend Developer Setup (Laptop A)

### Step 1 — Clone the repo

```bash
git clone https://github.com/Mkdheer/Customs.git
cd customs/frontend
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Create your environment file

Create a file called `.env` inside the `frontend/` folder:

```bash
# frontend/.env

# For local development on same laptop
REACT_APP_API_URL=http://localhost:8080/api

# For development across two laptops (ask backend dev for their IP)
# REACT_APP_API_URL=http://BACKEND_DEV_IP:8080/api
```

> ⚠️ Never push the `.env` file to GitHub. It is already in `.gitignore`.

### Step 4 — Start React

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## ⚙️ Backend Developer Setup (Laptop B)

### Step 1 — Clone the repo

```bash
git clone https://github.com/your-username/customs.git
cd customs/backend
```

### Step 2 — Set up MySQL database

Open MySQL and run:

```sql
CREATE DATABASE customs_db;
```

Then run the schema:

```bash
mysql -u root -p customs_db < ../database/schema.sql
```

Optionally seed sample data:

```bash
mysql -u root -p customs_db < ../database/seed.sql
```

### Step 3 — Configure application properties

Open `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/customs_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

> ⚠️ Never push `application.properties` with real credentials to GitHub.
> Use `application.properties.example` as a template instead.

### Step 4 — Find your laptop's IP address

```bash
# Windows
ipconfig
# Look for IPv4 Address — e.g. 192.168.1.10

# Mac / Linux
ifconfig
# Look for inet under en0 — e.g. 192.168.1.10
```

Share this IP with the frontend developer so they can update their `.env` file.

### Step 5 — Start Spring Boot

```bash
mvn spring-boot:run
```

Backend runs at: `http://localhost:8080`

---

## 🔗 Connecting Frontend and Backend

Both laptops must be on the **same WiFi network**.

```
Laptop A                          Laptop B
React (localhost:3000)  ───────→  Spring Boot (192.168.1.10:8080)
                                         ↕
                                     MySQL (3306)
```

1. Backend dev shares their IP address with frontend dev
2. Frontend dev updates `REACT_APP_API_URL` in their `.env` file
3. Both run their servers
4. React calls Spring Boot over the local network

---

## 🔌 API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | /api/auth/register          | Register customer or tailor        |
| POST   | /api/auth/login             | Login and receive JWT token        |
| GET    | /api/categories             | Get all item categories            |
| GET    | /api/categories/:id/styles  | Get styles for a category          |
| POST   | /api/orders                 | Place a new custom order           |
| GET    | /api/orders/:id             | Get order details and status       |
| PATCH  | /api/orders/:id/status      | Update order status (tailor)       |
| GET    | /api/tailors/nearby         | Find tailors by location           |
| POST   | /api/tailors/register       | Register a new tailor              |
| POST   | /api/tailors/:id/accept     | Tailor accepts an order            |
| GET    | /api/customers/:id/orders   | Get all orders for a customer      |

---

## 🔄 Team Git Workflow

Both developers work on the same repo but in separate branches.

```bash
# Always pull latest before starting work
git pull origin main

# Create your own branch
git checkout -b feature/your-feature-name

# After finishing your work
git add .
git commit -m "add: describe what you built"
git push origin feature/your-feature-name

# Then open a Pull Request on GitHub to merge into main
```

### Branch naming convention

| Type | Example |
|------|---------|
| New feature | `feature/order-screen` |
| Bug fix | `fix/measurement-fields` |
| Backend API | `api/orders-endpoint` |
| Database | `db/add-ratings-table` |

---

## ⚠️ Important — What NOT to Push to GitHub

Add these to `.gitignore` — they contain passwords and secrets:

```
# Frontend
frontend/node_modules/
frontend/.env

# Backend
backend/target/
backend/src/main/resources/application.properties

# MySQL
*.sql.bak
```

Instead, share credentials **privately** over WhatsApp or Slack with your teammate.

---

## 🌐 Deployment (When Ready to Go Live)

Once development is done, deploy so anyone can access the app:

| Part | Platform | Cost |
|------|----------|------|
| React Frontend | Vercel or Netlify | Free |
| Spring Boot Backend | Railway or Render | Free tier |
| MySQL Database | PlanetScale or Railway | Free tier |

After deployment, update `REACT_APP_API_URL` in your frontend from the
local IP to the live backend URL.

---

## 🗺️ Roadmap

### Phase 1 — MVP
- [x] Project setup (React + Spring Boot + MySQL)
- [ ] Customer order flow (4 steps)
- [ ] Tailor registration and order acceptance
- [ ] Order tracker (4 steps)
- [ ] REST API for orders and tailors

### Phase 2 — Growth
- [ ] JWT authentication
- [ ] Push notifications
- [ ] Geolocation-based tailor matching
- [ ] Rating and review system
- [ ] Upload reference image

### Phase 3 — Scale
- [ ] Budget range and bidding system
- [ ] AI size suggester
- [ ] Tailor earnings dashboard
- [ ] Repeat order with saved measurements
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/your-feature-name`
3. Commit your changes — `git commit -m "add: your feature description"`
4. Push to the branch — `git push origin feature/your-feature-name`
5. Open a Pull Request on GitHub

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Authors

**Frontend Developer**
- GitHub: [@frontend-dev-username](https://github.com/Mkdheer)

**Backend Developer**
- GitHub: [@backend-dev-username](https://github.com/Mkdheer)

---

> *Customs — because every body is different and every style is personal.*
