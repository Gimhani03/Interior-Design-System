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
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with at least:

```bash
MONGODB_URI=mongodb://localhost:27017/interior-design-system
JWT_SECRET=your_jwt_secret_here
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
# or
npm start
```

By default, the server typically runs on `http://localhost:5000` (adjust as per `server.js` if you’ve changed it).

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

If needed, create a `.env` in `frontend/`:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

The app will be available at the URL Vite prints (commonly `http://localhost:5173`).

---

## Key Frontend Pages

- `AboutUs.jsx` – Marketing/landing content, feature overview, testimonials, CTA
- `Dashboard.jsx` – User dashboard overview
- `Designs.jsx`, `AdminDesigns.jsx`, `ManageDesigns.jsx` – Design listing and admin design management
- `Designer.jsx` – Main 2D room planning experience
- `Viewer3D.jsx` – 3D room visualization and export
- `FurnitureCatalog.jsx`, `AdminCatalog.jsx`, `FurnitureManagement.jsx` – Furniture catalog and admin furniture tools
- `Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`, `ConfirmPassword.jsx`, `AdminLogin.jsx` – Auth flows
- `Payment.jsx`, `PurchaseHistory.jsx` – Checkout and past orders
- `Profile.jsx`, `ManageUsers.jsx` – User and admin user management

---

## Sample Data & Local Assets

- `frontend/src/data/designSamples.js`
  - Provides **sample 2D layouts and design metadata** used by:
    - `Designs`, `AdminDesigns`, `ManageDesigns`, and `Designer`
  - Uses placeholder images from **placehold.co** for quick thumbnails.

- `frontend/src/data/furnitureData.js`
  - Defines an array of **sample furniture items** including:
    - `modelPath` – expected `.glb` 3D models (e.g. `/assets/models/Sofa.glb`)
    - `imagePath` – 2D preview images (e.g. `/assets/images/Sofa.png`)
  - These assets are assumed to be **project‑specific** models and renders authored or owned by the project team.
  - If you replace or augment them with third‑party assets, update the **Credits** section accordingly.

> **Note:** `modelPath` and `imagePath` values point to `/assets/...` paths. Ensure that the corresponding models and images are placed in your static assets folder (e.g. Vite `public/assets/…`) when deploying.

---

## Scripts

### Frontend (`frontend/package.json`)

- `npm run dev` – Start Vite dev server
- `npm run build` – Build production bundle
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

### Backend (`backend/package.json`)

- `npm run dev` – Start server with nodemon
- `npm start` – Start server with Node

---

## API & Backend Overview

The backend exposes RESTful endpoints (Express + MongoDB via Mongoose) for:

- User registration, login, and authentication (JWT)
- Furniture CRUD operations
- Design CRUD and sample design overrides
- Orders and purchase history
- Email endpoints (e.g. password reset via Nodemailer)

Refer to `backend/routes/` and `backend/models/` for specific details and shape of the data models.

---

## Styling & Design System

- Global theme and tokens live in `frontend/src/index.css` via Tailwind’s `@layer base`.
- The app uses:
  - A warm **neutral palette** tailored to interior design use‑cases
  - **Poppins** and **Outfit** fonts (via Google Fonts)
  - Custom CSS modules for complex pages like `Designer.css`, `Dashboard.css`, `AdminDashboard.css`, `FurnitureCatalog.css`, etc.

---

## Additional Resources & Credits

This project uses several external resources for visuals and UI. They are credited below.

### Images & Visuals

- **Hero Image on About page**
  - **File/Usage**: `AboutUs.jsx` hero (`ImageWithFallback` component)
  - **Source**: Unsplash image at  
    `https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop`
  - **License**: Unsplash License – free to use; no attribution legally required, but attribution is appreciated.
  - **Credit**: *Interior room photography image courtesy of Unsplash*.

- **Placeholder Thumbnails**
  - **File/Usage**: `frontend/src/data/designSamples.js`, constant `PLACEHOLDER_IMG`
  - **URL**: `https://placehold.co/80x80/e2e8f0/8B7355?text=F`
  - **Service**: `https://placehold.co`
  - **Credit**: *Placeholder images generated via Placehold.co*.

- **Furniture Images & 3D Models**
  - **File/Usage**: `frontend/src/data/furnitureData.js`
  - **Paths**:
    - Models: `/assets/models/*.glb` (e.g. `Sofa.glb`, `Dining Set.glb`, `Bed.glb`, `Shelf.glb`, `Kitchen.glb`, etc.)
    - Images: `/assets/images/*.png` (e.g. `Sofa.png`, `Dinning Set.png`, `Bed.png`, `Shelf.png`, `Couch.png`, `Coffee Table.png`, `Kitchen.png`)
  - **Ownership**: These assets are intended to represent **project‑owned / custom** 3D models and rendered images.
  - **Credit**: *3D furniture models and rendered thumbnails created for this Interior Design System project.*  
    If you replace them with third‑party assets (e.g. from Sketchfab, Poly Haven, CGTrader, etc.), please:
    - Ensure license compatibility (commercial vs. non‑commercial),
    - Update this **Furniture Images & 3D Models** subsection with the original authors, source links, and licenses.

- **3D Environment Lighting**
  - **File/Usage**: `frontend/src/pages/Viewer3D.jsx` (`<Environment preset="city" />`)
  - **Source**: `@react-three/drei` environment presets (HDRIs provided with the library)
  - **Credit**: *Environment lighting courtesy of the `@react-three/drei` preset collection.*

### Fonts

- **Poppins** and **Outfit**
  - **File/Usage**: Imported in `frontend/src/index.css`
  - **Source**: `https://fonts.google.com/`
  - **License**: SIL Open Font License (OFL)
  - **Credit**: *“Poppins” and “Outfit” fonts provided by Google Fonts, licensed under the SIL Open Font License.*

> Note: Several CSS files reference `'Inter', sans-serif` as a font‑family. If you actively use **Inter** (e.g. via a separate import), please ensure the font is added and credit it similarly as a Google Font (OFL).

### Icons & UI Libraries

- **Lucide Icons**
  - **Package**: `lucide-react`
  - **Usage**: Icons across multiple components/pages (e.g. `AboutUs.jsx`, `Viewer3D.jsx`, dashboards and navigation)
  - **License**: Lucide is open source (ISC license)
  - **Credit**: *Iconography provided by Lucide (`lucide-react`).*

- **React Icons**
  - **Package**: `react-icons`
  - **License**: MIT
  - **Credit**: *Additional icon sets via `react-icons`.*

- **Radix UI**
  - **Packages**: `@radix-ui/react-*` components (Avatar, Checkbox, Dialog, Dropdown Menu, Label, Select, Separator, Slot, Tabs, Toggle, Toggle Group, Tooltip)
  - **License**: MIT
  - **Credit**: *Headless accessible primitives provided by Radix UI.*

### JavaScript & React Libraries

- **React Three Fiber, Drei, and three.js**
  - **Packages**: `@react-three/fiber`, `@react-three/drei`, `three`
  - **Usage**: 3D rendering and interaction in `Viewer3D.jsx` and 3D helpers
  - **License**: MIT (React Three Fiber, Drei, three.js)
  - **Credit**: *3D rendering powered by React Three Fiber, Drei, and three.js.*

- **Recharts**
  - **Package**: `recharts`
  - **Usage**: Charts/analytics in dashboard/admin pages
  - **License**: MIT
  - **Credit**: *Data visualizations provided by Recharts.*

- **Sonner**
  - **Package**: `sonner`
  - **Usage**: Toast notifications across the frontend
  - **License**: MIT
  - **Credit**: *Notification toasts powered by Sonner.*

- **Other Notable Libraries**
  - `@tanstack/react-table` – Data tables
  - `zod` – Schema validation
  - `axios` – HTTP client
  - `tailwindcss`, `tailwind-merge`, `tailwindcss-animate` – Styling and animations
  - `next-themes` – Theme handling
  - **Credit**: *These libraries are used under their respective open‑source licenses.*

### Backend Libraries

- **Node & Express**
  - `express`, `cors`, `dotenv`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `nodemailer`, `nodemon`
  - **Credit**: *Backend powered by Express, MongoDB via Mongoose, JWT auth, and Nodemailer for email.*

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add my feature"
   ```
4. Push the branch and open a Pull Request.

Please follow existing code style and structure, and update this README if you add new external assets or libraries that require attribution.

---

## License

This project’s source code is licensed under the terms specified in the repository’s license file (or default copyright of the author if none is present).  
External libraries, fonts, images, and 3D assets retain their **own licenses** as credited above.
