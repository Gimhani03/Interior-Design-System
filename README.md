# Interior Design System

Interior Design System is a full‑stack web application for planning interior spaces with a **2D room planner**, **3D visualization**, and a **curated furniture catalog**. It supports both **end‑users** (designing their own rooms) and **admins** (managing furniture, designs, and users).

---

## Features

- **Authentication & Roles**
  - Email/password login and registration
  - Separate **user** and **admin** experiences
  - Password reset and confirmation flows

- **User Dashboard**
  - Overview of saved designs and recent activity
  - Access to the 2D Designer, 3D Viewer, and purchase history

- **2D Room Planner (Designer)**
  - Drag‑and‑drop furniture on a 2D canvas
  - Snap‑to‑grid and boundary‑aware placement
  - Sample layouts (living room, bedroom, kitchen, etc.) to get started quickly

- **3D Viewer (`Viewer3D`)**
  - BIM‑style 3D view powered by **React Three Fiber** and **three.js**
  - Interactive camera controls (orbit, zoom)
  - Real‑time furniture manipulation with collision/room‑boundary checks
  - Export current 3D view as a PNG image

- **Furniture Catalog**
  - Rich catalog of furniture items with dimensions, materials, pricing, and ratings
  - Filter by category (Living Room, Bedroom, Office, Kitchen, etc.)
  - Detail pages with descriptions and 3D/2D previews

- **Admin Tools**
  - Admin dashboard for managing designs, furniture inventory, and users
  - Sample design layouts with override support (create, update, soft‑delete)

- **Orders & Payments (Conceptual)**
  - Order model and routes on the backend for tracking purchases
  - UI for payment and purchase history on the frontend

---

## Tech Stack

- **Frontend**
  - React + Vite
  - React Router
  - Tailwind CSS (with custom design tokens)
  - Radix UI primitives & headless components
  - React Three Fiber (`@react-three/fiber`) & Drei (`@react-three/drei`) for 3D
  - Recharts for analytics/visualizations
  - Axios for HTTP requests
  - Zod for validation
  - Sonner for toasts/notifications

- **Backend**
  - Node.js
  - Express
  - MongoDB + Mongoose
  - JWT‑based authentication
  - Bcrypt for password hashing
  - Nodemailer for email (password reset / notifications)
  - CORS and dotenv configuration

---

## Project Structure (High Level)

- `frontend/`
  - `src/pages/` – Route pages (Dashboard, Designer, Viewer3D, Catalog, Auth, Admin, etc.)
  - `src/components/` – Shared UI components (Navbar, cards, tables, layouts, 3D helpers)
  - `src/data/` – Static/sample data (e.g., `designSamples.js`, `furnitureData.js`)
  - `src/services/api.js` – API helper/wrapper
  - `src/index.css` – Global styles, Tailwind setup, and theme tokens
  - `vite.config.js`, `tailwind.config.js`, `eslint.config.js` – Tooling and configuration

- `backend/`
  - `models/` – Mongoose models (`User`, `Furniture`, `Design`, `Order`, etc.)
  - `routes/` – Express route handlers
  - `server.js` – Express server entry
  - `seed.js` – Sample data seeding script

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB instance (local or remote)

### 1. Clone the Repository

```bash
git clone <REPO_URL>
cd "Interior Design System"