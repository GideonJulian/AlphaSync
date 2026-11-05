# AlphaSync User Flow and Application Architecture

This document is the product-flow reference for future AlphaSync frontend work.
It distinguishes the current frontend implementation from the intended user
journey. Routes and UI described as planned are not implied to have backend,
payment, verification, or trading functionality.

## Status key

- **Implemented** — present in the current frontend.
- **Planned** — part of the intended product flow, but not implemented yet.
- **Placeholder** — a visible frontend mock or message without a real service.

## 1. Landing Page

### What visitors see

The public landing page at `/` introduces AlphaSync as an MT5 copy-trading
platform. It includes:

- The product header and links to landing-page sections.
- A hero section describing copying trades and account custody.
- A sample trading telemetry illustration.
- A "How it Works" explanation.
- Separate audience sections for Copiers and Traders.
- A final account-creation call to action and footer.

These are informational and illustrative UI elements. The telemetry does not
represent a live account.

### Landing actions and destinations

| Action | Current behavior | Intended next step |
|---|---|---|
| **Get Started** in the header or hero | Navigates to `/auth`. | Open registration, then send the new user to the dashboard for the role they selected. |
| **Explore Traders** in the hero or header | Scrolls to the `#user-types` landing-page section. It does not open a marketplace or trader profile. | Let visitors inspect the audience/product information. A future marketplace or trader-detail destination can be added when those screens exist. |
| **Sign in** in the header | Navigates to `/auth`, which currently opens in registration mode. | Open the login mode, ideally using an explicit login destination or mode parameter. |
| **Start copying** / **Become a trader** audience links | Both navigate to `/auth`; neither currently preselects a role. | Open registration with Copier or Trader preselected, respectively. |
| **Create your account** final call to action | Navigates to `/auth`. | Open registration and continue through role-based onboarding. |

## 2. Authentication

Authentication is implemented as a single page at `/auth`. The page supports
registration and login modes in local React state, with a role selector shown
only in registration mode.

### Intended registration flow

1. A visitor arrives at `/auth` in registration mode.
2. They select **Copier** or **Trader**. The default selection is Copier.
3. They enter their full name, email address, and password.
4. The selected role is associated with the account at registration.
5. After successful registration, the user's role determines the destination:
   - Copier → `/copier/dashboard`
   - Trader → `/trader/dashboard`

The role-specific CTA label changes between "Create Copier Account" and
"Create Trader Account".

**Current implementation:** Role selection, form validation, password
visibility, and the role-dependent CTA are present. A valid registration form
submission navigates to the selected role's dashboard as frontend flow
preparation; it does not create an account or call an authentication service.
The selected role is only component state and is not persisted.

### Intended login flow

1. The user switches the `/auth` page from registration to login.
2. They enter their email and password.
3. Their existing account role, loaded from account data after authentication,
   determines their destination:
   - Copier → `/copier/dashboard`
   - Trader → `/trader/dashboard`
4. Users do not select a role again during login.

**Current implementation:** Login mode displays email and password fields,
password visibility, a forgot-password action, and a Sign In button. Login
submission and password reset are frontend placeholders; they do not
authenticate, look up an account role, or navigate. The forgot-password
placeholder displays a notice.

## 3. Role-based dashboard routing

There are two role-specific dashboard destinations. A user should land directly
on the dashboard for their account role; the application must not require a
role choice after authentication.

| Role | Route | Intended experience |
|---|---|---|
| Copier | `/copier/dashboard` | Copier-specific navigation and a dashboard state selected from Copier account data. |
| Trader | `/trader/dashboard` | Trader-specific navigation and a dashboard state selected from Trader setup/account data. |

### Current route configuration

`src/routes/AppRouter.jsx` uses `createBrowserRouter` with an array of route
objects. Its current routes are:

- `/` — `PublicLayout` with the Landing Page.
- `/auth` — `AuthLayout` with the Authentication Page.
- `/copier/dashboard` — `CopierLayout` with the Copier Dashboard.
- `/trader/dashboard` — `TraderLayout` with the Trader Dashboard.
- `*` — Not Found page.

There is no general `/dashboard` route and no role-selection screen after
authentication. Copier and Trader routes use separate nested layouts.

## 4. Dashboard navigation

Dashboard navigation must be role-specific. It must not include a Copier/Trader
role selector or links that allow an authenticated user to switch role.

### Copier navigation

The intended Copier navigation is:

- Overview
- Marketplace
- My Strategies
- Positions
- Trade History
- Performance
- Wallet
- Notifications
- Settings

**Current implementation:** `CopierLayout` renders one shared sidebar for both
Copier account states. It follows the existing-user Stitch sidebar design and
adapts to a horizontally scrollable mobile navigation. Existing page sections
use local anchors; destinations without an implemented section are disabled.
Notifications remain a header button in the Copier dashboard.

### Trader navigation

The intended Trader navigation is:

- Overview
- My Strategy
- Performance
- Subscribers
- Trade History
- Earnings
- Notifications
- Settings

**Current implementation:** `TraderLayout` provides a separate Trader
navigation configuration. Overview is linked to `/trader/dashboard`; other
destinations are visibly disabled until their pages are implemented. The
Trader dashboard itself remains a placeholder.

## 5. Account states

New and existing account experiences are conditional states within each role's
dashboard page. They are not separate dashboard routes or page files.

### Copier states

- **New account:** MT5 is not connected. The dashboard prompts the user to
  connect MT5, shows setup progress, and offers strategy discovery previews.
- **Existing account:** MT5 is connected. The dashboard shows account metrics,
  active copied strategies, performance, risk information, and open positions.

**Current implementation:** Both presentations are contained in
`src/pages/copier/CopierDashboard.jsx`. A mock `hasConnectedMT5` value chooses
which state renders. The default is `false`; changing it to `true` previews the
existing-user state. Account figures and interactions are mock/frontend-only.
The `hasActiveSubscription` field is present in the mock data but does not
currently determine a different presentation.

### Trader states

- **New account:** Trader setup has not been completed. The intended dashboard
  should guide the user through MT5 connection, strategy setup, and required
  verification.
- **Existing account:** Setup is complete. The intended dashboard should let
  the Trader manage their published strategy, subscribers, performance, and
  earnings.

**Current implementation:** `src/pages/trader/TraderDashboard.jsx` only renders
a placeholder heading and description. Neither Trader state has been
implemented.

## 6. Future user journeys

### Copier journey

**Planned end-to-end journey:**

Landing Page → Authentication → Copier Dashboard → Connect MT5 → Explore
Marketplace → View Trader Details → Subscribe → Payment → Configure Copy
Trading → Activate Copying → Monitor Positions and Performance

**Implemented frontend:** Landing Page; Authentication UI; Copier Dashboard
with mock New User and Existing User states; local dashboard controls and
placeholder notices.

**Planned/not implemented:** Account creation or login service, role
persistence, MT5 connection, live marketplace data, trader-detail pages,
subscription processing, payment, copy-trading configuration and execution,
and live position/performance data.

### Trader journey

**Planned end-to-end journey:**

Landing Page → Authentication → Trader Dashboard → Connect MT5 → Set Up
Strategy → Complete Required Verification → Publish Strategy → Manage
Subscribers → Monitor Performance → Manage Earnings

**Implemented frontend:** Landing Page; Authentication UI with a Trader role
selection; `/trader/dashboard` route with a placeholder page.

**Planned/not implemented:** Account creation or login service, role
persistence, Trader dashboard states, MT5 connection, strategy creation,
verification, publishing, subscriber management, performance data, and
earnings management.

## 7. Routing and architecture rules

These rules apply to future changes:

1. Page entry files remain in `src/pages/`.
2. Reusable and page-specific components remain in `src/components/`.
3. Layouts remain in `src/layouts/`.
4. Route configuration remains in `src/routes/AppRouter.jsx`.
5. Use `createBrowserRouter` with an array of route objects.
6. Copier and Trader dashboards use role-specific layouts/navigation where
   necessary; do not make a role switcher part of either dashboard's sidebar.
7. New and existing account experiences are conditional states in their role's
   dashboard page component. Do not create separate page files just for
   account states.
8. Resolve the authenticated user's role before routing to a dashboard. Do not
   send users to a general dashboard where they must choose a role.
9. Keep backend, authentication, payment, MT5, verification, and trading
   responsibilities out of frontend placeholders until those integrations are
   explicitly implemented.

## Current Implementation Issues

1. **Authentication does not complete:** Registration submission navigates to
   the selected role's dashboard as frontend flow preparation, but does not
   create an account or persist a role. Login displays a placeholder notice and
   does not authenticate, resolve a saved role, or navigate.
2. **Landing actions do not preserve role intent:** "Start copying" and "Become
   a trader" both open the same `/auth` state, with no role preselection.
3. **Sign in opens registration mode:** The header links to `/auth`, whose
   initial mode is registration. A visitor must manually switch to login.
4. **Some Copier navigation destinations are not implemented:** Copier
   navigation is role-specific, and active local anchors target existing page
   sections. Destinations without a page or section are disabled until
   implemented.
5. **Copier navigation destinations are partly placeholders:** Both states
   now share the same Copier sidebar, but some destinations do not yet have
   implemented screens or page sections.
6. **Trader dashboard is not implemented:** The `/trader/dashboard` route
   exists, but its page is only a placeholder and does not render onboarding
   or an established Trader dashboard.
7. **Dashboard account state is mock-only:** Copier state selection is
   hard-coded for preview and is not connected to a user's authenticated
   account. Trader account states are not represented.
8. **Product journey steps are missing:** MT5 linking, Trader verification,
    subscription, payment, copying configuration/execution, and live account
    data are not implemented.

## Recommended Implementation Changes

These changes are recommendations for future product work and integrations.

1. Add real authentication and account persistence. Store the selected role at
   registration and load the saved role at login.
2. Route a successfully authenticated user directly to `/copier/dashboard` or
   `/trader/dashboard` based on their account role. Provide a clear login entry
   (for example a mode query parameter or separate auth entry route) so the
   Landing Page's Sign In action opens login directly.
3. Pass role intent from the Landing Page to registration so "Start copying"
   and "Become a trader" can preselect Copier and Trader, respectively.
4. Implement the outstanding Copier destinations and enable navigation only
   when each corresponding page or section exists.
5. Add the remaining Copier navigation destinations as screens or page
   sections when they are designed.
6. Implement Trader onboarding and established dashboard states within the
   Trader dashboard page, selected from Trader account/setup data.
7. Connect Copier and Trader state selection to account data rather than
   hard-coded preview values. Remove unused mock fields when real state rules
   are defined.
8. Implement future journey screens and services in stages: MT5 connection,
   marketplace and trader details, subscriptions/payments, copy configuration,
   Trader verification and publishing, and account/performance/earnings data.
9. Replace placeholder actions and static metrics with explicit loading,
   success, error, and empty states as each integration becomes available.
