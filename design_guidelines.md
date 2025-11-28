# Slot Buying Panel CRM - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Modern SaaS Dashboard Patterns

**Justification:** This is a data-heavy, productivity-focused CRM application requiring consistent UI patterns, clear information hierarchy, and efficient workflows. Drawing inspiration from Linear, Notion, and established CRM platforms while maintaining the specified blue theme.

**Core Principles:**
- Clarity over decoration - every element serves a functional purpose
- Scannable information architecture for quick decision-making
- Consistent patterns across admin and buyer portals
- Efficient workflows with minimal clicks

---

## Typography

**Font Family:** Inter (primary), system-ui fallback
- **Headlines (H1):** 2xl/3xl, font-semibold - Dashboard titles, page headers
- **Section Headers (H2):** xl/2xl, font-semibold - Module sections, card headers
- **Subsections (H3):** lg, font-medium - Table headers, form sections
- **Body Text:** base, font-normal - Descriptions, table data, form labels
- **Small Text:** sm, font-normal - Metadata, timestamps, helper text
- **Micro Text:** xs, font-medium - Badges, status indicators, tags

---

## Layout System

**Spacing Scale:** Use Tailwind units of **2, 4, 6, 8, 12, 16** (e.g., p-4, gap-6, mt-8)

**Grid Structure:**
- Dashboard cards: 4-unit padding (p-4 to p-6)
- Section spacing: 8-12 units between major sections (mb-8, gap-12)
- Form field spacing: 4-6 units (space-y-4)
- Table cell padding: 3-4 units (px-4, py-3)

**Container Widths:**
- Sidebar: Fixed 64 (w-64) - collapsible to icons only on mobile
- Main content: Full width with max-w-7xl centering
- Forms/modals: max-w-2xl for optimal readability
- Data tables: Full width with horizontal scroll on mobile

---

## Component Library

### Navigation
**Sidebar (Both Portals):**
- Fixed left sidebar with logo at top
- Icon + label navigation items (8-unit height each)
- Active state: subtle background, left border accent
- User profile at bottom with role badge
- Collapsible on tablet/mobile

**Top Bar:**
- Fixed top bar with breadcrumbs on left
- Notifications bell, user avatar dropdown on right
- Search bar (admin only) - centered or right-aligned

### Dashboard Components

**Stat Cards (Analytics):**
- Grid layout: 4 columns desktop, 2 tablet, 1 mobile
- Large number (text-2xl to text-3xl, font-bold)
- Label below (text-sm)
- Small trend indicator with icon (↑/↓)
- 6-unit padding, subtle border

**Data Tables:**
- Sticky header row with sort indicators
- Alternating row backgrounds for scannability
- Actions column (right-aligned) with icon buttons
- Row hover state for interactivity
- Pagination at bottom (10/25/50/100 items per page)
- Empty state with illustration and CTA

**Charts (Analytics Dashboard):**
- Use chart library (Chart.js or Recharts)
- Line charts for trends, bar charts for comparisons
- Donut/pie for distributions
- Subtle grid lines, clear axis labels
- Legend below or to the right

### Forms

**Input Fields:**
- Full-width by default, group related fields in grid
- Label above input (text-sm, font-medium)
- Helper text below (text-xs)
- Error states with red text and border
- Success states with green checkmark icon

**Buttons:**
- Primary: Blue, medium height (h-10), rounded, font-medium
- Secondary: Blue outline, same sizing
- Destructive: Red for delete/reject actions
- Icon buttons: Square, minimal padding for table actions

**Select/Dropdowns:**
- Custom styled selects matching input fields
- Multi-select with tags/chips for categories
- Searchable dropdowns for long lists

### Status Indicators

**Badges:**
- Small, rounded-full pills
- Green: Active, Approved, Paid, Completed
- Yellow: Pending, In Progress
- Red: Rejected, Overdue, Inactive
- Gray: Draft, Disabled
- Include dot indicator before text

**Progress Bars:**
- For monthly target tracking (buyer dashboard)
- Thin bar (h-2) with percentage text above
- Segments for different thresholds (80%, 100%)

### Modals & Overlays

**Modals:**
- Centered overlay with backdrop blur
- max-w-lg to max-w-2xl depending on content
- Header with title and close button
- Scrollable content area
- Fixed footer with action buttons

**Slide-over Panels:**
- For detail views (order details, slot details)
- Slides from right, fixed width (w-96 to w-1/2)
- Close button top-right
- Sections with dividers

### Cards

**Standard Card:**
- Subtle border, slight shadow on hover
- 4-6 unit padding
- Header with title and optional actions
- Content area with natural spacing
- Footer with metadata or actions (optional)

**Product Cards (Catalog):**
- Image placeholder at top (aspect-ratio-square)
- Product name (font-semibold)
- Pricing grid: Manufacturing cost, distributor price, MRP
- Stock status badge
- Action buttons at bottom

### Communication

**Chat Interface:**
- Split view: conversation list (left 1/3), messages (right 2/3)
- Messages: sender avatar, timestamp, bubble design
- Input at bottom with send button
- Online/offline status indicators

**Ticket System:**
- Status badge, priority indicator
- Ticket number, subject, timestamp
- Assigned to field with avatar
- Category tags

---

## Responsive Behavior

**Desktop (lg+):** Sidebar visible, multi-column layouts, expanded tables
**Tablet (md):** Collapsible sidebar, 2-column grids, compact spacing
**Mobile (base):** Bottom nav bar alternative, single column, stacked forms, horizontal scroll tables

---

## Automation & Notifications

**Toast Notifications:**
- Slide in from top-right
- Success (green), error (red), info (blue), warning (yellow)
- Auto-dismiss after 5 seconds
- Include icon and action button (optional)

**In-app Notifications:**
- Bell icon with unread count badge
- Dropdown panel with notification list
- Mark as read interaction
- Link to relevant page

---

## Images

**No large hero images** - This is an internal business application, not a marketing site.

**Image Usage:**
- Product catalog: Square product placeholders (aspect-ratio-square)
- User avatars: Circular, 32px-48px standard
- Empty states: Simple illustrations (undraw.co style)
- Document icons: PDF, Excel, Word file type indicators

---

## Key Differentiators

- **Dual Dashboard Design:** Maintain visual consistency between admin and buyer portals while showing role-appropriate data
- **Slot Territory Visualization:** Consider map view for assigned territories (optional enhancement)
- **Commission Calculator:** Interactive widget showing real-time commission calculations
- **Target Progress:** Prominent visual indicators for monthly targets with milestone celebrations