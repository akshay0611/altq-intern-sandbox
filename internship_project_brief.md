# Internship Project Brief: Smart Feedback & Reputation Module

**Role:** Full Stack Developer Intern (MERN)  
**Duration:** 4 Weeks  
**Project Lead:** CTO, AltQ.in  
**Project Goal:** Design and develop a production-grade "Customer Voice" module that allows salon customers to rate their experience and managers to analyze staff performance.

---

## 1. Executive Summary
This project acts as a functional module for the AltQ ecosystem. Currently, we lack a structured way to gather post-service feedback. You will build a standalone system that bridges this gap.

**Core Value Proposition:**
1.  **For Customers:** A frictionless, mobile-first way to say "Thank You" or report issues.
2.  **For Managers:** Data-driven insights to identify top-performing stylists.

**Constraints:**
*   This is a **Greenfield Project** (Started from scratch).
*   It must be **Repo-Isolated** (Built in a separate repository, not the main monolith).
*   Review cycles will be **Weekly**.

---

## 2. Technical Architecture & Stack

### Frontend (Client Application)
*   **Framework:** React 18 (Vite)
*   **Language:** TypeScript (Strict Mode equivalent)
*   **Styling:** Tailwind CSS (Mobile-first approach is mandatory)
*   **State Management:** React Context API or Zustand (for simple global state)
*   **Routing:** React Router v6

### Backend (API Service)
*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js
*   **Validation:** Joi or Zod (Strict input validation)
*   **Architecture:** Controller-Service-Repository pattern (Clean Architecture)

### Database
*   **System:** MongoDB (Atlas Free Tier)
*   **ODM:** Mongoose

---

## 3. Database Schema Specifications

You are required to implement the following schemas with precise types.

### A. Stylist Collection (`stylists`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Auto-generated |
| `name` | String | Yes | Full name of the staff member |
| `specialty` | String | Yes | E.g., "Haircut", "Colorist", "Spa" |
| `avatarUrl` | String | No | URL to profile image (use placeholders initially) |
| `isActive` | Boolean | Yes | Default: `true` (Soft delete flag) |
| `averageRating`| Number | No | Cached average rating (Optional optimization) |
| `createdAt` | Date | Yes | Auto-timestamp |

### B. Review Collection (`reviews`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Auto-generated |
| `visitId` | String | Yes | Unique ID linking to the appointment (simulate this) |
| `stylistId` | ObjectId | Yes | Reference to `Stylists` collection |
| `rating` | Number | Yes | Integer 1-5 |
| `sentiment` | String | No | Enum: `POSITIVE`, `NEUTRAL`, `NEGATIVE` (Derived) |
| `tags` | Array<String> | No | E.g., `["Hygiene", "Friendly", "Fast"]` |
| `comment` | String | No | Max 500 chars |
| `customerName` | String | No | Optional (Anonymous by default) |
| `createdAt` | Date | Yes | Auto-timestamp |

---

## 4. API Specification (RESTful)

### Public Endpoints (Customer Facing)

#### 1. `GET /api/v1/public/stylists`
*   **Purpose:** Populate the dropdown for customers to choose who served them.
*   **Response:**
    ```json
    [
      { "id": "65a...", "name": "Sarah J.", "specialty": "Hair" },
      { "id": "65b...", "name": "Mike T.", "specialty": "Spa" }
    ]
    ```

#### 2. `POST /api/v1/public/reviews`
*   **Purpose:** Submit a new feedback entry.
*   **Validation Rules:**
    *   `stylistId`: Must be a valid MongoDB ObjectId.
    *   `rating`: Min 1, Max 5.
    *   `comment`: Max length 500 characters.
*   **Body:**
    ```json
    {
      "visitId": "VISIT-1029",
      "stylistId": "65a...",
      "rating": 5,
      "tags": ["Great Service", "Clean"],
      "comment": "Loved the haircut!"
    }
    ```

### Admin Endpoints (Manager Facing)

#### 3. `GET /api/v1/admin/dashboard-stats`
*   **Purpose:** Power the main dashboard cards.
*   **Logic:** Use MongoDB Aggregation to calculate:
    *   Total reviews count (This Month).
    *   Average Network Rating (All stylists combined).
    *   NPS Breakdown (Promoters vs. Detractors).

#### 4. `GET /api/v1/admin/stylist-performance`
*   **Purpose:** Leaderboard table.
*   **Response:** List of stylists sorted by generic average rating (descending).

---

## 5. UI/UX Requirements

### A. The "Feedback Wizard" (Mobile Web)
*   **Step 1: Identity:** "Who served you today?" (Visual grid of avatars or simple dropdown).
*   **Step 2: Rating:** Large, tappable Star Icons (Star borders fill on hover/click).
*   **Step 3: Tags:** Chips/Pills for quick feedback (e.g., [ + Good Vibe ] [ + Professional ]).
*   **Step 4: Comment:** Simple text area (Auto-expand).
*   **Transition:** Smooth slide animation between steps is a huge plus.

### B. The "Command Center" (Desktop Web)
*   **Layout:** Sidebar navigation + Main Content Area.
*   **Visuals:** Clean, white-space heavy design. Use standard dashboard cards.
*   **Interactive Elements:**
    *   Hovering over a rating in the table should show the text comment in a tooltip.
    *   Filters: "Last 7 Days", "Last 30 Days", "All Time".

---

## 6. Weekly Execution Roadmap

### Week 1: Core Backend & Database
*   [x] **Project Scaffold:** The `frontend` and `backend` folders are already provided.
*   [ ] **Server Setup:** Review `package.json` in backend and install dependencies.
*   [ ] **Database:** Connect to your personal MongoDB Atlas cluster.
*   [ ] **Seeding:** Create a script to populate the DB with 10 dummy stylists.
*   [ ] **Milestone:** A working `POST` API accessible via Postman (code pushed to GitHub).

### Week 2: Frontend "Customer Flow"
*   [ ] Setup React + Tailwind + Lucide Icons.
*   [ ] Build the Mobile Feedback Wizard (Components: `StarRating`, `TagSelector`, `WizardStep`).
*   [ ] Integrate with Backend API.
*   [ ] **Milestone:** A user can submit feedback from their phone browser and see it appear in MongoDB.

### Week 3: Data Aggregation & Dashboard
*   [ ] Write the complex MongoDB Aggregation queries for stats.
*   [ ] Build the Dashboard UI (using a chart library like `Recharts` or `Chart.js`).
*   [ ] Implement "Recent Activity" feed.
*   [ ] **Milestone:** Dashboard accurately reflects the data submitted in the customer flow.

### Week 4: Polish, Security & Deployment
*   [ ] **Rate Limiting:** Prevent spam spamming the feedback API (express-rate-limit).
*   [ ] **Validation:** Ensure no crash on bad data.
*   [ ] **Edge Cases:** Handle "No Data" states in the dashboard.
*   [ ] **Documentation:** Write a `README.md` explaining how to run the project.

---

## 7. Submission & Evaluation Criteria

**You will be evaluated on:**

1.  **Code Structure:** separation of concerns (Business logic should not be inside Route handlers).
2.  **Git Hygiene:** No "monster commits". Small, atomic commits with clear messages.
3.  **UI Polish:** Alignment, padding consistency, and mobile responsiveness. It doesn't need to be artistic, but it must be neat.
4.  **Error Handling:** If the backend is down, the frontend should show a "Service Unavailable" message, not a white screen.

**Resources Provided:**
*   [Design Tokens](./resources/design_tokens.md) (Color Palette Hex Codes).
*   Logo Assets.
*   [Mock Data JSON](./resources/mock_data.json) (for initial testing).
