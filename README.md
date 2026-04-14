# AutoCenter — Dealers Auto Center Front End Task

A React application built for the **Dealers Auto Center Front End Developer** hiring task. Covers both required tasks: an API-based product listing dashboard and a validated registration form.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧭 User Journey (Test Guide)

### 1. Registration Form `/` (Home)

The app opens on the **registration form** — a full-screen branded page.

- Try clicking **Submit** with all fields empty → inline error messages appear on every field instantly
- Try entering an invalid email (e.g. `notanemail`) → "Invalid email format" appears
- Try a password shorter than 6 chars → "Password must be at least 6 characters" appears
- Try a phone number with letters → regex validation rejects it
- Fill all fields correctly and click **Complete Registration**:
  - A 1-second simulated API delay runs
  - The button shows a spinner ("Submitting Form...")
  - A green **success banner** appears: "Registration successful! Redirecting to dashboard →"
  - After 1.5 seconds you are **automatically redirected to `/dashboard`**

---

### 2. Dashboard `/dashboard`

You land on the **vehicle listings** page with a sticky navbar at the top.

#### Navbar
- Click **AutoCenter** logo or **Dashboard** → stays on dashboard
- Click **Register** → returns to the form at `/`

#### Tab Switcher (in the hero header)
| Tab | Data Source | Count |
|---|---|---|
| **Vehicles** | `/products/category/vehicle` | ~9 items |
| **All Products** | `/products?limit=12&skip=N` | 194+ items |

- Click **All Products** → instantly loads 12 products, resets search/sort

#### Search (debounced 300ms)
- Type in the search box → results filter as you type with a 300ms debounce
- Clear the input → results restore

#### Sort
- Use the sort dropdown to sort by **Price: Low→High**, **Price: High→Low**, **Name: A→Z**, **Name: Z→A**

#### Pagination (Desktop, All Products tab)
- Navigate pages using numbered buttons — current page is highlighted blue
- Ellipsis (`…`) collapses long page ranges
- Previous/Next arrows are disabled at boundaries
- Changing page scrolls back to the top automatically

#### Infinite Scroll (Mobile, All Products tab)
- Resize browser to < 768px (or open DevTools mobile emulation)
- Scroll to the bottom → next 12 products load automatically
- A **"Loading more..."** spinner appears during fetch
- **"You've seen everything!"** message when all items are loaded

#### Loading States
- Refresh the dashboard → an **animated skeleton grid** renders while data fetches
- Cards fade in as data arrives

---

## 🏗 Tech Stack

| Tool | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Full type safety |
| **Vite** | Build tool / dev server |
| **TanStack Router** | File-based routing with type-safe navigation |
| **TanStack Query** | Server state, caching, stale-time |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation (`zodResolver`) |
| **Tailwind CSS v4** | Styling |
| **Lucide React** | Icons |
| **DummyJSON** | Public mock API |

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout (Outlet)
│   ├── index.tsx           # / → Registration form
│   ├── dashboard.tsx       # /dashboard → Product dashboard
│   └── form.tsx            # /form → (alternate form route)
│
├── components/
│   ├── Navbar.tsx          # Sticky top navigation
│   ├── ProductCard.tsx     # Product card + skeleton
│   │
│   ├── dashboard/
│   │   ├── Dashboard.tsx   # Container: state, queries, layout
│   │   ├── CategoryTabs.tsx # Vehicles / All Products tab switcher
│   │   ├── SearchInput.tsx  # Debounced search field
│   │   ├── SortSelect.tsx   # Sort dropdown
│   │   ├── ProductGrid.tsx  # Responsive product grid
│   │   ├── LoadingGrid.tsx  # Skeleton loading state
│   │   ├── EmptyState.tsx   # No results state
│   │   └── Pagination.tsx   # Desktop pagination controls
│   │
│   └── form/
│       ├── ValidatedForm.tsx # Container: react-hook-form + zod
│       ├── FormInput.tsx     # Reusable labeled input with error
│       ├── SuccessBanner.tsx # Post-submit success message
│       └── SubmitButton.tsx  # Submit with loading spinner
│
├── hooks/
│   ├── useDebounce.ts      # Debounce any value by delay (ms)
│   └── useIsMobile.ts      # Returns true when width < 768px
│
└── services/
    └── api.ts              # fetchVehicles() + fetchAllProducts(page, limit)
```

---

## ✅ Task Checklist

### Task 1 — API Listing Page
- [x] Fetch from public API (DummyJSON vehicles + all products)
- [x] Card/grid layout with image, title, price, rating
- [x] Search by name
- [x] Sort by price and name (4 options)
- [x] Loading state (skeleton grid)
- [x] Error state
- [x] Functional components + hooks
- [x] Separate `ProductCard` component
- [x] Responsive design
- [x] **Bonus:** Debounced search (`useDebounce`)
- [x] **Bonus:** Pagination (desktop — numbered with ellipsis)
- [x] **Bonus:** Infinite scroll (mobile — `IntersectionObserver`)

### Task 2 — Form + Validation
- [x] Full Name, Email, Phone, Password fields
- [x] All fields required
- [x] Valid email format
- [x] Password minimum 6 characters
- [x] Phone: min 10 digits, numeric characters only
- [x] Inline error messages (real-time, `mode: 'onChange'`)
- [x] Success message on valid submit
- [x] Prevents submission when invalid
- [x] Clean layout with labels, spacing, error styling
- [x] **Bonus:** Auto-redirect to dashboard on success
