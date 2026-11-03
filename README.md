# BOOKLY – Smart Booking & Business Management SaaS

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**BOOKLY** is a high-performance, commercial-grade appointment scheduling and business management SaaS platform designed for modern salons, spas, fitness studios, executive consultants, and service-based businesses.

Crafted with a sleek, minimalist aesthetic inspired by industry benchmarks such as **Linear**, **Stripe**, and **Calendly**, BOOKLY delivers a comprehensive workflow: from customer acquisition and frictionless online booking to client CRM, schedule orchestration, and revenue analytics.

---

## 🌟 Key Capabilities

### 1. High-Converting Marketing Landing Page
- **Sticky Glass Navbar**: Blur backdrop with brand badge, smooth section anchors, theme switcher, and instant demo actions.
- **Linear-Style Hero**: Ambient radial glow, dynamic product badge, dual CTAs, star rating badges, and social proof metric strip.
- **Interactive Multi-Industry Preview**: Live toggle between Salons, Gyms, and Consultants with synchronized metrics, simulated bookings, and revenue feeds.
- **Features Grid**: 6 capability cards with hover glows and micro-interactions.
- **Industry Solutions Showcase**: Tabbed value propositions with metrics for Salons, Fitness Studios, Advisory, and Spas.
- **How It Works**: 3-step visual onboarding workflow.
- **Interactive Pricing Matrix**: Monthly/Annual toggle with 20% savings badge and feature breakdown.
- **Testimonials Carousel**: Verified customer reviews with client avatars, studio names, and star ratings.
- **FAQ Accordion**: Expandable questions addressing common client queries.
- **High-Impact CTA Banner & Global Footer**: Newsletter subscription with toast feedback and 99.98% SLA live status pill.

### 2. Simulated Authentication & Persona Switcher
- **Login Screen**: Split-layout design with testimonial quotes, form validation, "Remember Me", and **1-Click Fast Demo Login** buttons for:
  - 👑 **Business Owner** (Alexander Pierce)
  - ✂️ **Staff Specialist** (Elena Gilbert)
  - 📋 **Studio Receptionist** (Claire Beauchamp)
- **Signup Screen**: Business onboarding flow with industry category selector, form validation, and confetti celebration.
- **Forgot Password Flow**: Multi-step simulation (email entry, 6-digit OTP verification code, new password setup).
- **Route Protection**: Automated guards redirecting unauthenticated visitors to `/login`.

### 3. Business Overview & Metrics Command Center
- **Key Metric Stat Cards**: Real-time Gross Revenue, Active Bookings, Total Clients, and Occupancy Rate with month-over-month trend indicators.
- **Revenue Velocity Chart**: Smooth Recharts Area chart with Weekly vs. Monthly timeframe toggle.
- **Service Demand Share**: Donut chart visualizing booking distribution across categories.
- **Today's Live Queue**: Real-time appointments with 1-click status actions (Start / Complete / Cancel).
- **Recent Activity Stream**: Live feed of bookings, transactions, and client updates.

### 4. Appointment & Booking Management
- **Table & Grid Views**: Flexible display modes with persistent state.
- **Live Search & Filter**: Filter by status (`All`, `Confirmed`, `In-Progress`, `Completed`, `Cancelled`, `Pending`) and live search across customer names, service names, and booking IDs.
- **Booking Detail Modal**: Inspection drawer with client phone, email, price, duration, staff assignment, and internal appointment notes.
- **Global "+ New Booking" Modal**: Available from anywhere in the application with automatic price/duration calculations.

### 5. Interactive Multi-View Calendar
- **Month, Week, and Day Views**: Seamlessly switch between scheduling perspectives.
- **Interactive Slot Booking**: Clicking any empty calendar cell launches the New Booking modal prefilled with that date and time slot.
- **Color-Coded Status Chips**: Visual appointment blocks indicating confirmed, in-progress, and completed states.

### 6. Customer Directory & CRM
- **Client Roster**: Searchable by name, email, and phone number with category tags (`VIP`, `Regular`, `New`).
- **Client Dossier**: Detailed view displaying lifetime spend, total visit counts, allergy/color formula notes, and complete booking history.
- **Customer CRUD**: Full Add, Edit, and Delete workflows with confirmation guards.

### 7. Service Catalog & Offerings
- **Category Grouping**: Hair & Styling, Skin & Spa, Fitness & Training, Consultation.
- **Service CRUD**: Add, edit, and delete services with custom duration, pricing, and descriptions.
- **In-Place Status Toggle**: One-click enable/disable switch to hide or reveal services from online bookings.

### 8. Revenue & Growth Analytics
- **Timeframe Selector**: 7 Days, 30 Days, 90 Days, and Year-to-Date.
- **Advanced KPIs**: Average Ticket Size, Client Retention Rate, No-Show Rate, and Repeat Booking Velocity.
- **Visual Analytics**:
  - Gross Revenue Progression Area Chart
  - Day-of-Week Volume Bar Chart
  - New vs Returning Client Acquisition Line Chart
  - Top Performing Services Leaderboard with revenue contribution progress bars

### 9. Platform Settings & Local Storage Sync
- **Business Profile**: Editable studio name, tagline, category, contact info, address, currency, and timezone.
- **Weekly Schedule Configurator**: Day-by-day open/closed switches with custom opening and closing hours.
- **Notification Preferences**: Toggles for SMS alerts, email confirmations, and morning schedule digests.
- **Team Specialists**: Staff members directory with assigned roles and invite simulation.
- **Data Danger Zone**: One-click **"Reset Demo Data"** action to restore the original seed dataset.

---

## 🛠️ Technology Stack

| Layer | Tools & Libraries |
| :--- | :--- |
| **Frontend Framework** | React 18.3 + Vite 5.4 |
| **Routing** | React Router DOM v6.26 |
| **Styling** | Tailwind CSS v3.4 + PostCSS + Autoprefixer |
| **Animation & Micro-interactions** | Framer Motion v11.5 + GSAP 3.12 (ScrollTrigger) |
| **Data Visualization** | Recharts v2.12 |
| **Iconography** | Lucide React |
| **Class Utilities** | clsx + tailwind-merge |
| **Celebrations** | canvas-confetti |

---

## 📁 Project Structure

```
BOOKLY SaaS/
├── index.html                     # HTML5 shell with Google Fonts & meta tags
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite bundler & chunking configuration
├── tailwind.config.js             # Custom colors, shadows, and dark mode configuration
├── postcss.config.js              # PostCSS plugins
├── public/
│   └── favicon.svg                # Modern SVG favicon
└── src/
    ├── main.jsx                   # React root entry point
    ├── App.jsx                    # Root component with providers & scroll reset
    ├── index.css                  # Tailwind directives & custom CSS scrollbars/glows
    ├── components/
    │   ├── common/                # Reusable UI primitives
    │   │   ├── Badge.jsx          # Color-coded status badge
    │   │   ├── Button.jsx         # Accessible button with 6 variants & loading states
    │   │   ├── Card.jsx           # Card, CardHeader, CardTitle, CardContent
    │   │   ├── EmptyState.jsx     # Clean empty-result placeholder
    │   │   ├── Input.jsx          # Accessible input with error & icon support
    │   │   ├── Modal.jsx          # Accessible modal dialog with backdrop & ESC key
    │   │   ├── Select.jsx         # Custom styled select input
    │   │   ├── StatCard.jsx       # Metric card with trend percentage indicator
    │   │   └── ThemeToggle.jsx    # Dark/Light theme toggle button
    │   ├── bookings/
    │   │   └── NewBookingModal.jsx# Global appointment creation modal
    │   ├── feedback/
    │   ├── landing/               # Landing page sections
    │   │   ├── HeroSection.jsx
    │   │   ├── LivePreviewSection.jsx
    │   │   ├── FeaturesSection.jsx
    │   │   ├── SolutionsSection.jsx
    │   │   ├── HowItWorksSection.jsx
    │   │   ├── PricingSection.jsx
    │   │   ├── TestimonialsSection.jsx
    │   │   ├── FaqSection.jsx
    │   │   └── CtaBannerSection.jsx
    │   └── layout/                # Shells & Navbars
    │       ├── DashboardHeader.jsx
    │       ├── DashboardLayout.jsx
    │       ├── DashboardSidebar.jsx
    │       ├── PublicFooter.jsx
    │       └── PublicNavbar.jsx
    ├── context/                   # React Context Providers
    │   ├── AuthContext.jsx        # Simulated auth, demo accounts, roles
    │   ├── DataContext.jsx        # Central CRUD engine & localStorage persistence
    │   ├── ThemeContext.jsx       # Dark/Light mode management
    │   └── ToastContext.jsx       # Non-intrusive toast notifications
    ├── data/                      # Realistic seed datasets
    │   ├── mockAnalytics.js       # Revenue, volume, and service breakdown data
    │   ├── mockBookings.js        # 14+ initial appointment records
    │   ├── mockBusiness.js        # Business profile, hours, demo accounts
    │   ├── mockCustomers.js       # 10+ client CRM records with avatars & notes
    │   └── mockServices.js        # 10+ categorized service offerings
    ├── pages/
    │   ├── public/                # Publicly accessible routes
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   └── NotFoundPage.jsx
    │   └── dashboard/             # Protected admin routes
    │       ├── OverviewPage.jsx
    │       ├── BookingsPage.jsx
    │       ├── CalendarPage.jsx
    │       ├── CustomersPage.jsx
    │       ├── ServicesPage.jsx
    │       ├── AnalyticsPage.jsx
    │       └── SettingsPage.jsx
    ├── routes/
    │   ├── AppRoutes.jsx          # Route definitions
    │   └── ProtectedRoute.jsx     # Auth redirection guard
    └── utils/
        ├── cn.js                  # Tailwind class merger
        ├── formatters.js          # Currency, date, time, duration formatters
        └── storage.js             # LocalStorage safe wrapper
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18+` or `v20+` (tested on Node v26)
- **npm**: `v9+` or `v11+`

### Installation & Run

1. **Clone or navigate to the repository directory**:
   ```bash
   cd "BOOKLY SaaS"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000` (or `http://localhost:5173`).

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🔒 Demo Authentication Notes & Personas

For seamless portfolio review and client presentations, BOOKLY provides **1-Click Demo Login** shortcuts on the `/login` screen:
- **Business Owner**: `alexander@bookly.com` (Full admin privileges)
- **Staff Specialist**: `elena@bookly.com` (Lead Stylist)
- **Studio Receptionist**: `reception@bookly.com` (Client Experience Coordinator)

*Note: Authentication and payment checkout are currently simulated using a centralized React Context with `localStorage` persistence. The architecture is cleanly decoupled to allow drop-in integration with real backend APIs.*

---

## 🛣️ Production Backend Integration Roadmap

When connecting BOOKLY to a production backend infrastructure, the following architecture is recommended:

1. **Authentication**: Replace `AuthContext` with Supabase Auth, Clerk, Firebase Authentication, or NextAuth / Auth0.
2. **Database & ORM**: PostgreSQL paired with Prisma ORM or Drizzle ORM for relational tables (`users`, `studios`, `services`, `bookings`, `customers`, `staff_roster`).
3. **Payments**: Integrate Stripe Connect (Custom or Express accounts) so studio owners can connect their bank accounts and process client cards with Stripe Elements.
4. **Automated Messaging**: Integrate Twilio SMS API and Resend / SendGrid for automated 24h appointment reminders and receipts via background jobs (Trigger.dev or BullMQ).
5. **Real-Time Calendar Sync**: Connect Google Calendar and Apple iCloud Calendar API via bidirectional webhooks.

---

## 📄 License
This project is licensed under the MIT License.

