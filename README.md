# DelightPrep 🇳🇬

> **Smart Preparation for Better Results** — Nigeria's modern Computer-Based Test (CBT) and exam preparation platform designed for Junior & Senior Secondary students preparing for BECE, WAEC, NECO, and JAMB/UTME.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Explanations-8E75C0)](https://deepmind.google/technologies/gemini/)

---

## 🌟 Overview

**DelightPrep** provides Nigerian secondary school students with curriculum-aligned practice materials, official exam-format simulation engines, and intelligent step-by-step diagnostic feedback. Aligned with the **NERDC 9-Year Basic and Senior Secondary Curriculum**, DelightPrep bridges the gap between classroom theory and computer-based national examinations.

---

## 🎯 Target Exams & Curriculum Coverage

| Education Stage | Target Classes | Standard Examinations Covered |
|:---|:---|:---|
| **Junior Secondary** | JSS 1 – JSS 3 | **BECE** (Basic Education Certificate Examination) / Junior WAEC |
| **Senior Secondary** | SSS 1 – SSS 3 | **WAEC / WASSCE**, **NECO SSCE**, **JAMB / UTME**, GCE |

### Curriculum Subjects
- **General Core**: Mathematics, English Language / English Studies, Civic Education
- **Science Department**: Physics, Chemistry, Biology, Further Mathematics, Agricultural Science
- **Commercial Department**: Economics, Commerce, Financial Accounting
- **Arts & Humanities**: Government, Literature in English, CRS / IRS, History

---

## ✨ Key Features

- ⏱️ **Authentic CBT Exam Engine**: Full-length timed mock exams (e.g. 180-question 4-subject JAMB simulation, 50-question WAEC papers) with rapid question navigation, flag-for-review, and integrated scientific calculator.
- 🤖 **AI-Powered Explanations**: Instant step-by-step problem breakdowns, formula derivations, and conceptual insights powered by the Gemini API.
- 🏫 **Nigerian Schools Directory**: Built-in verification and leaderboard integration with Federal Unity Colleges, State Public, and accredited Private & Mission secondary schools across all 36 States + FCT.
- 📊 **Diagnostic Score Breakdowns**: Multi-dimensional results highlighting accuracy per subject, topic mastery, and suggested revision actions.
- 🔥 **Gamified Study Streaks & XP**: Daily practice goals, XP levels, continuous study streak counters, and achievement badges to keep students motivated.
- 🌓 **Adaptive Dark & Light Theme**: Built-in theme selector with smooth transitions and persistent user preference synchronization.
- 🔒 **Enterprise-Grade Security**: PostgreSQL database powered by Supabase with granular Row-Level Security (RLS) policies and authentication.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + custom animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Motion (Framer Motion v12)](https://motion.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL 15+, Auth, RLS)
- **AI Tutoring**: Google Gemini API (`@google/genai`)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/delightprep.git
cd delightprep
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-secret-key

# Gemini AI (Server-Side)
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Initialize Database
Execute the consolidated schema script located at `supabase/full_database_setup.sql` in your Supabase SQL Editor.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

Proprietary © Delight Tech Network. All rights reserved.
