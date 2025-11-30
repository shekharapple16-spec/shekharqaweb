# 🌐 Complete Data Flow & API URLs Guide

## 📍 Your Website URLs

Replace `your-vercel-url` with your actual Vercel deployment URL:
- Example: `https://connect2shekharweb.vercel.app`
- Or: `https://your-custom-domain.com`

---

## 🔄 Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (User Browser)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. User goes to COURSE PAGE                                     │
│     https://your-vercel-url/course                              │
│     ↓                                                             │
│  2. User clicks "Enroll" button                                  │
│     ↓                                                             │
│  3. Form opens (React Modal)                                     │
│     - Name field                                                  │
│     - Email field                                                │
│     - Phone field                                                │
│     - Company field                                              │
│     - Experience dropdown                                        │
│     ↓                                                             │
│  4. User fills form & clicks Submit                              │
│     ↓                                                             │
│  5. JavaScript calls API endpoint                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓ HTTP POST Request
┌─────────────────────────────────────────────────────────────────┐
│                   API ENDPOINT (Backend)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Route: POST /api/send-enrollment                               │
│  Full URL: https://your-vercel-url/api/send-enrollment          │
│                                                                   │
│  File: /pages/api/send-enrollment.js                            │
│                                                                   │
│  What it does:                                                   │
│  1. Receives form data (name, email, phone, company, experience)│
│  2. Validates all required fields                               │
│  3. Calls db.createEnrollment()                                 │
│  4. Returns success/error response                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓ Calls Database Function
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE LAYER (/lib/db.js)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Function: createEnrollment()                                    │
│                                                                   │
│  What it does:                                                   │
│  1. Creates table if not exists:                                │
│     CREATE TABLE enrollments (                                  │
│       id TEXT PRIMARY KEY,                                       │
│       name VARCHAR(255),                                         │
│       email VARCHAR(255),                                        │
│       phone VARCHAR(20),                                         │
│       company VARCHAR(255),                                      │
│       experience VARCHAR(50),                                    │
│       enrolled_at TIMESTAMP                                      │
│     )                                                            │
│  2. Inserts new enrollment:                                      │
│     INSERT INTO enrollments                                      │
│     VALUES (id, name, email, phone, company, experience)        │
│  3. Returns saved enrollment                                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓ SQL Query
┌─────────────────────────────────────────────────────────────────┐
│            VERCEL POSTGRES DATABASE (Cloud)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🗄️  Database: course-enrollments                               │
│  📊 Table: enrollments                                            │
│                                                                   │
│  ┌──────────┬─────────────┬──────────────────┬───────────────┐  │
│  │ id       │ name        │ email            │ phone         │  │
│  ├──────────┼─────────────┼──────────────────┼───────────────┤  │
│  │ 17344929 │ John Doe    │ john@example.com │ 1234567890    │  │
│  │ 17344930 │ Jane Smith  │ jane@example.com │ 9876543210    │  │
│  │ 17344931 │ Bob Johnson │ bob@example.com  │ 5555555555    │  │
│  └──────────┴─────────────┴──────────────────┴───────────────┘  │
│                                                                   │
│  ┌───────────────┬────────────┬────────────────────────────────┐ │
│  │ company       │ experience │ enrolled_at                    │ │
│  ├───────────────┼────────────┼────────────────────────────────┤ │
│  │ Tech Co       │ beginner   │ 2025-11-30 10:15:30 UTC        │ │
│  │ Design Inc    │ intermediate│ 2025-11-30 10:20:45 UTC        │ │
│  │ StartUp LLC   │ advanced   │ 2025-11-30 10:25:12 UTC        │ │
│  └───────────────┴────────────┴────────────────────────────────┘ │
│                                                                   │
│  Data stored PERMANENTLY ✅                                     │
│  (Persists across deployments)                                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 All API Endpoints

### **1. Send Enrollment (Save Data)**
```
POST /api/send-enrollment
URL: https://your-vercel-url/api/send-enrollment

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "Tech Co",
  "experience": "beginner"
}

Response (Success):
{
  "success": true,
  "message": "Enrollment submitted successfully!",
  "enrollmentId": "1734496530000"
}

Response (Error):
{
  "success": false,
  "error": "Missing required fields"
}
```

**Used by:** `/pages/course.js` when user submits form

---

### **2. Get Enrollments (Fetch All Data)**
```
GET /api/get-enrollments
URL: https://your-vercel-url/api/get-enrollments

Headers Required:
Authorization: Bearer YOUR_ADMIN_PASSWORD_BASE64

Response (Success):
{
  "success": true,
  "enrollments": [
    {
      "id": "1734496530000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "company": "Tech Co",
      "experience": "beginner",
      "enrolledAt": "2025-11-30T10:15:30.000Z"
    },
    {
      "id": "1734496545000",
      "name": "Jane Smith",
      "email": "jane@example.com",
      ...
    }
  ],
  "total": 2
}

Response (Error):
{
  "error": "Unauthorized"
}
```

**Used by:** `/pages/admin/enrollments.js` to show all enrollments

---

### **3. Delete Enrollment (Remove Data)**
```
DELETE /api/delete-enrollment?id=1734496530000
URL: https://your-vercel-url/api/delete-enrollment?id=ENROLLMENT_ID

Headers Required:
Authorization: Bearer YOUR_ADMIN_PASSWORD_BASE64

Response (Success):
{
  "success": true,
  "message": "Enrollment deleted successfully"
}

Response (Error):
{
  "error": "Enrollment not found"
}
```

**Used by:** `/pages/admin/enrollments.js` when admin deletes enrollment

---

## 🌍 User-Facing URLs

### **Course Page (Enroll Form)**
```
GET https://your-vercel-url/course

Shows:
- Video list
- Enrollment statistics (Live updated every 10 seconds)
- "Enroll Now" button
- Enrollment form (modal)
```

**File:** `/pages/course.js`

---

### **Admin Login**
```
GET https://your-vercel-url/admin/login

Requires:
- Admin password

Sets:
- localStorage.adminToken
```

**File:** `/pages/admin/login.js`

---

### **Admin Enrollments Dashboard**
```
GET https://your-vercel-url/admin/enrollments

Shows:
- All enrollments in table
- Search/filter options
- Download CSV button
- Delete buttons

Requires:
- Admin authentication
```

**File:** `/pages/admin/enrollments.js`

---

## 🔐 How Authentication Works

### **Admin Password Flow**

1. **Admin Login Page:**
   ```
   User enters password
   → Hashed to Base64
   → Stored in localStorage.adminToken
   ```

2. **API Calls:**
   ```
   Frontend sends: Authorization: Bearer [hashed_password]
   Backend checks: Is token valid?
   If yes: Return data
   If no: Return 401 Unauthorized
   ```

3. **Verification Function** (`/lib/auth.js`):
   ```javascript
   const adminPassword = process.env.ADMIN_PASSWORD || 'default-password'
   const expectedToken = Buffer.from(adminPassword).toString('base64')
   return token === expectedToken
   ```

---

## 📊 Real-Time Statistics

### **Course Page Shows Live Count:**

```
GET /api/get-enrollments (called every 10 seconds)

Display:
├─ Total Enrollments: 5
├─ Beginner Level: 2
├─ Intermediate Level: 2
└─ Advanced Level: 1
```

**File:** `/pages/course.js` (useEffect hook)

---

## 🧪 Test All Endpoints

### **Test with cURL/Postman:**

**1. Save Enrollment:**
```bash
curl -X POST https://your-vercel-url/api/send-enrollment \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "phone":"1234567890",
    "company":"Test Co",
    "experience":"beginner"
  }'
```

**2. Get All Enrollments:**
```bash
# First, get your admin password Base64:
echo -n "your-admin-password" | base64
# Output: eW91ci1hZG1pbi1wYXNzd29yZA==

curl -X GET https://your-vercel-url/api/get-enrollments \
  -H "Authorization: Bearer eW91ci1hZG1pbi1wYXNzd29yZA=="
```

**3. Delete Enrollment:**
```bash
curl -X DELETE "https://your-vercel-url/api/delete-enrollment?id=1734496530000" \
  -H "Authorization: Bearer eW91ci1hZG1pbi1wYXNzd29yZA=="
```

---

## 🔍 Where to Find Your Vercel URL

1. Go to https://vercel.com/dashboard
2. Select your project: `connect2shekharweb`
3. Copy the **Production** URL
4. Replace `your-vercel-url` with this URL

Example:
```
Your URL: https://connect2shekharweb.vercel.app

So endpoints become:
- POST https://connect2shekharweb.vercel.app/api/send-enrollment
- GET https://connect2shekharweb.vercel.app/api/get-enrollments
- GET https://connect2shekharweb.vercel.app/course
- GET https://connect2shekharweb.vercel.app/admin/enrollments
```

---

## ✅ Data Persistence Guarantee

| Location | Persistence | Backups | Access |
|----------|-------------|---------|--------|
| Vercel Postgres | ✅ Forever | ✅ Auto | ✅ Via API |
| Browser localStorage | ❌ Deleted on clear | ❌ None | ❌ Client only |
| Files (old way) | ❌ Lost on deploy | ❌ None | ❌ No access on Vercel |

**Current Setup Uses:** ✅ Vercel Postgres = **Production Ready!**

---

## 📝 Summary

- **User enrolls** → POST `/api/send-enrollment`
- **Data saved** → Vercel Postgres (permanent)
- **Admin views** → GET `/api/get-enrollments`
- **Admin deletes** → DELETE `/api/delete-enrollment`
- **Statistics** → Updated every 10 seconds on course page

**Everything is connected and working together!** 🚀
