# AltQ Reputation Module (Internship)

Welcome to your internship sandbox! This repository contains a complete implementation of the Reputation Module project - a customer feedback and staff performance tracking system for salons.

## 🎯 Project Overview

This is a full-stack application that allows:
- **Customers** to submit feedback about their salon experience through a mobile-first wizard
- **Managers** to view analytics, performance metrics, and staff leaderboards through an admin dashboard

## 🏗️ Architecture

*   **/frontend**: React 18 application (Vite + TypeScript + Tailwind CSS)
*   **/backend**: Express.js API (Node.js + TypeScript + MongoDB)

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS (Mobile-first design)
- React Router v6
- Recharts for data visualization
- Lucide React for icons
- Axios for API calls

**Backend:**
- Express.js with TypeScript
- MongoDB with Mongoose
- Clean Architecture (Repository-Service-Controller pattern)
- Zod for validation
- Express Rate Limit for API protection

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/altq-reputation?retryWrites=true&w=majority
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will populate the database with 10 sample stylists and 3 sample reviews.

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App will run on `http://localhost:5173`

## 📡 API Endpoints

### Public Endpoints

- `GET /api/v1/public/stylists` - Get all active stylists
- `POST /api/v1/public/reviews` - Submit a new review

### Admin Endpoints

- `GET /api/v1/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/v1/admin/stylist-performance` - Get stylist performance leaderboard

## 🎨 Features

### Customer Feedback Wizard
- ✅ Step-by-step mobile-first interface
- ✅ Stylist selection with avatars
- ✅ Interactive star rating (1-5)
- ✅ Tag selection for quick feedback
- ✅ Optional comment field (max 500 chars)
- ✅ Smooth animations and transitions

### Admin Dashboard
- ✅ Real-time statistics (Total reviews, Average rating, NPS score)
- ✅ NPS breakdown pie chart
- ✅ Top performers bar chart
- ✅ Stylist performance leaderboard
- ✅ Time filter (7 days, 30 days, All time)
- ✅ Responsive design for desktop

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/       # Validation, error handling
│   ├── models/          # Mongoose schemas
│   ├── repositories/    # Data access layer
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── scripts/         # Seeding scripts
│   └── validators/      # Zod schemas

frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── config/          # API configuration
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   └── types/           # TypeScript types
```

## 🧪 Testing the Application

1. **Submit Feedback:**
   - Navigate to `/feedback`
   - Select a stylist
   - Rate your experience
   - Add tags and comments
   - Submit

2. **View Dashboard:**
   - Navigate to `/dashboard`
   - View statistics and charts
   - Check stylist performance rankings

## 🔒 Security Features

- Rate limiting on review submission (10 requests per 15 minutes)
- Input validation with Zod
- Error handling middleware
- CORS configuration

## 📝 Documentation
*   [Project Brief](./internship_project_brief.md)
*   [Kickoff Guide](./project_kickoff.md)
*   [Design Tokens](./resources/design_tokens.md)
*   [Mock Data](./resources/mock_data.json)

## 🚢 Deployment

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

The built files will be in the `dist` folder for both projects.

## 📄 License

ISC

---

Built with ❤️ for AltQ.in
