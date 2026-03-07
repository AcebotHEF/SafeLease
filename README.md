# SafeLease: Off-Campus Housing & Escrow Platform

**Project SafeLease** is a secure real estate marketplace designed for the **Enyata Buildathon 2026**. It protects students from losing money to fraudulent agents by verifying identities and holding fees in a secure Escrow wallet.

---

## 🚀 The Pitch
Students frequently lose money to fake agents when looking for off-campus housing. SafeLease eliminates this by verifying agents and holding rent/viewing fees in a secure Escrow wallet. Funds are only released to the agent after the student physically inspects the property and confirms it matches the listing.

## 🛠 Tech Stack
**Frontend:** Next.js or React + TanStack libraries.
**Backend:** Node.js/Express, Python/FastAPI, or Hono.
**Database:** PostgreSQL.
**Payment Infrastructure:** Interswitch API Marketplace.

## 💳 Interswitch API Mastery
To ensure security and transparency, we utilize multiple Interswitch APIs from the Developer Console:
**Identity & Verification (NIN/BVN API):** Used during Agent onboarding to verify identity before listing.
**Payment Gateway (Web Checkout):** Used by students to pay rent/viewing fees securely.
**Transaction Search API:** Used by the backend to verify payment status before locking funds.
**Transfers & Refund API:** Used to disburse funds to agents or process refunds for disputed transactions.

## 🔄 Core User Flow

### 1. The Agent Flow
**Signup & KYC:** Agent registers and validates identity via Interswitch NIN/BVN Verification.
**Listing:** Once verified, agents upload property details and photos.
**Dashboard:** Agents view pending payments held in escrow and successful payouts.

### 2. The Student Flow
**Discovery:** Student browses verified off-campus properties.
**Escrow Payment:** Student pays the fee via Interswitch Web Checkout.
**Lock State:** Backend verifies payment via Transaction Search API and marks the property as "Locked" while funds sit in escrow.
**Inspection & Release:** If satisfied after inspection, the student clicks "Approve" to trigger the Transfers API to the agent.
**Dispute:** If a scam is detected, the student clicks "Dispute" to lock funds until admin intervention.

### 3. The Admin Flow (Dispute Resolution)
**Review:** Admin logs into a hidden `/admin` route to view all DISPUTED transactions.
**Resolution:** Admin reviews the case and triggers either a "Refund Student" or "Release to Agent" action via Interswitch.

## 👥 Team Roles
**Hacker 1 (Frontend Lead):** UI/UX, marketplace, and admin view.
**Hacker 2 (Frontend Integrator):** API connections, Web Checkout, and auth state management.
**Hacker 3 (Backend Engineer):** Database schema and Escrow state machine logic.
**Hacker 4 (API Specialist & PM):** Interswitch integration, webhooks, and technical documentation.

## 🔑 Test Credentials (For Judges)
**Student Login:** [Insert Test Email] / [Insert Password]
**Agent Login:** [Insert Test Email] / [Insert Password]
**Admin Login:** [Insert Test Email] / [Insert Password]

---
*Developed for Enyata Buildathon 2026.*