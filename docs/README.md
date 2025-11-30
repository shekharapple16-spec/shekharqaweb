# GitHub Copilot Course Platform

A clean, minimal Next.js web application for course enrollment and data management.

## Project Structure

```
docs/
├── pages/
│   ├── _app.js              # Next.js app wrapper
│   ├── index.js             # Home page (hero section)
│   ├── course.js            # Course page with enrollment form
│   ├── admin/
│   │   └── enrollments.js   # Admin dashboard for viewing enrollments
│   └── api/
│       ├── send-enrollment.js        # Submit and save enrollments
│       ├── get-enrollments.js        # Fetch all enrollments
│       └── delete-enrollment.js      # Delete enrollment records
├── components/
│   └── Layout.js            # Base layout wrapper
├── styles/
│   └── globals.css          # Global Tailwind CSS
├── data/
│   └── enrollments.json     # Enrollment data storage (auto-generated)
├── public/                  # Static assets (images, videos)
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## Features

### 1. Course Page (`/course`)
- Course overview with Day 1 & Day 2 content
- Video demonstrations
- Enrollment form modal
- Tab navigation (Overview & Resources)

### 2. Enrollment System
- Form with validation (name, email, phone, company, experience level)
- Data automatically saved to `data/enrollments.json`
- Automatic timestamp and unique ID generation
- No external dependencies required

### 3. Admin Dashboard (`/admin/enrollments`)
- View all enrollments in a table
- Search by name, email, or phone
- Filter by experience level
- Statistics (total, by level)
- Download as CSV
- Delete individual records

## Quick Start

### Installation
```bash
cd docs
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## Data Storage

Enrollment data is stored in: `docs/data/enrollments.json`

Each enrollment includes:
- Unique ID
- Name, Email, Phone
- Company (optional)
- Experience Level
- Enrollment Timestamp

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/send-enrollment` | POST | Submit new enrollment |
| `/api/get-enrollments` | GET | Fetch all enrollments |
| `/api/delete-enrollment?id=xxx` | DELETE | Delete specific enrollment |

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with hero section |
| Course | `/course` | Course content and enrollment |
| Enrollments | `/admin/enrollments` | View and manage enrollments |

## Tech Stack

- **Framework**: Next.js 13
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Backend**: Node.js API routes
- **Storage**: JSON file (easily migrate to database)

## Dependencies

- `next` - React framework
- `react` / `react-dom` - UI library
- `tailwindcss` - Styling framework
- `postcss` / `autoprefixer` - CSS processing

**Total**: 6 core dependencies (minimal and clean)

## Cleaned Up

✅ Removed unused components (Navbar, Sidebar)
✅ Removed CSS modules
✅ Removed environment files (.env.local, .env.local.example)
✅ Removed unused ESLint config
✅ Removed nodemailer (not needed)
✅ Simplified Tailwind config
✅ Removed unnecessary custom colors

## Usage

1. Go to `/course` and fill the enrollment form
2. View enrollments at `/admin/enrollments`
3. Download enrollments as CSV
4. Data is saved automatically to `data/enrollments.json`

## Next Steps

- Test enrollment form at `/course`
- View enrollments at `/admin/enrollments`
- Download enrollments as CSV for analysis
- Deploy to Vercel or any Node.js hosting

---

**Clean. Minimal. Fast.**
