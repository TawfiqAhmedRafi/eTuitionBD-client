
# eTuitionBD - Tuition Management System
- Live Demo: [eTuitionBD](https://etuition-17f11.web.app/)

## 📌 Project Purpose

The Tuition Management System is a full-stack MERN-based platform designed to connect students, tutors, and administrators through a structured, secure, and automated tuition workflow. It solves real-world problems such as tutor verification, tuition authenticity, transparent payments, and role-based system control.

## 🚀 Key Features

### 🔐 Authentication & Authorization
- Firebase Authentication (Email/Password)
- Google Social Login (default role: Student)
- JWT-based secure API access
- Role-based dashboard routing (Student / Tutor / Admin)
- Protected routes with reload persistence

### 👩‍🎓 Student Features
- Post, update, and delete tuition requests
- View tuition status (Pending / Approved / Rejected)
- View and manage tutor applications
- Approve tutors after successful Stripe payment
- Reject tutor applications
- View payment history
- Update profile information

### 👨‍🏫 Tutor Features
- Browse approved tuition posts
- Apply for tuitions via modal form
- Track application status
- View approved (ongoing) tuitions
- View revenue & earnings history
- Update/delete applications before approval

### 🛠️ Admin Features
- **User Management:** View, update, and delete users; change roles
- **Tuition Management:** Review, approve, or reject tuition posts
- **Reports & Analytics:** View earnings, transaction history, and financial charts

### 🏠 Public Pages & UI
- Responsive navbar with role-based navigation
- Home page with hero section, latest tuitions, and tutors
- Framer Motion animations
- Tuition listing, details, and tutor profiles
- Contact & About pages
- Custom 404 error page
- Fully responsive design

### 🔍 Advanced Features
- Search tuitions by subject & location
- Sort tuitions by budget & date
- Filter by class, subject, and location
- Pagination on tuition listings
