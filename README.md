# 🎓 eTuitionBD – Smart Tuition Management Platform  
🔗 **Live Demo:** https://etuition-17f11.web.app/

---

## 📌 Project Overview

**eTuitionBD** is a full-stack **MERN-based tuition management system** that connects **students, tutors, and administrators** through a secure and structured workflow.

The platform solves real-world problems such as tutor verification, tuition authenticity, secure payments, real-time communication, and role-based system control.

---

## 🚀 Core Features

### 🔐 Authentication & Security
- Firebase Authentication (Email & Password)
- Google Social Login (Default role: Student)
- JWT-secured backend APIs
- Role-based authorization (Student / Tutor / Admin)
- Protected routes with reload persistence
- Secure Axios interceptor (`useAxiosSecure`)

---

### 👩‍🎓 Student Features
- Create, update & delete tuition posts
- Track tuition status (Pending / Approved / Rejected / Ongoing)
- View and manage tutor applications
- Continue tuitions  only after successful Stripe payment
- Reject tutor applications
- Real-time chat with  tutors
- Notification alerts for messages, applications 
- View payment & transaction history
- Update profile information

---

### 👨‍🏫 Tutor Features
- Browse approved tuition posts
- Apply to tuitions with salary & cover letter
- Application validation (district, budget, ownership)
- Track application status
- View ongoing tuitions
- Real-time chat with assigned students
- Notifications for messages, approvals & payments
- View earnings & revenue analytics

---

### 💬 Messaging System
- One-to-one chat between student & tutor
- Conversation-based message threads
- Unread message counters
- Last message preview & timestamp
- Automatic message notifications

---

### 🔔 Notification System
- Centralized notification management
- Role-based notifications
- Notification sidebar UI
- Unread count badge
- Mark single or all as read
- Delete single or all notifications
- SweetAlert confirmation for destructive actions
- Optimized with TanStack React Query

---

### 💳 Payments & Tuition Flow
- Stripe Checkout integration
- Secure payment verification
- Tuition auto-status update after payment
- Platform fee & tutor earnings calculation
- Duplicate payment protection
- Tutor notification on payment success

---

### 🛠️ Admin Features
- User management (View / Update / Delete / Role change)
- Tuition moderation (Approve / Reject)
- Application & payment oversight
- Revenue & transaction analytics
- Monthly earnings charts

---

### 🔍 Advanced Tuition Browsing
- Search by subject & location
- Filter by class, subject & district
- Sort by budget & posted date
- Pagination for large datasets

---

## 🖥️ UI / UX
- Fully responsive dashboard
- Role-based navigation
- Framer Motion animations
- Tailwind CSS + DaisyUI custom themes
- Optimized API calls with React Query caching

---

## 🧰 Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS + DaisyUI
- TanStack React Query
- Axios
- Firebase Authentication
- SweetAlert2
- Framer Motion
- Swiper
- Recharts
- Lottie-React
- React Hook Form

**Backend**
- Node.js + Express
- MongoDB (Native Driver)
- JWT Authentication
- Stripe API
- Firebase Admin SDK

---

## 🎯 Why This Project Stands Out
- Real-world tuition workflow
- Secure financial transaction handling
- Role-isolated access control
- Chat & notification system like production apps
- Competition-ready & research-expandable


