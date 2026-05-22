# Sports Facility Reservation System - Frontend

## Project Overview

Sports Facility Reservation System is a full-stack web application where users can explore sports facilities, book available slots, and manage their reservations easily. Facility owners can add and manage sports facilities through a secure dashboard.

This frontend is built with Next.js and provides a modern, responsive, and user-friendly experience.

## Live Links

- Client URL: https://assignment-9-client-one.vercel.app/
- Server URL: https://assignment-9-server-roan.vercel.app/

---

## Features

- User authentication and protected routes
- Browse all sports facilities
- Book available facilities
- Manage personal bookings
- Add new facilities
- Manage existing facilities
- Responsive UI for mobile and desktop
- Toast notifications for user actions
- Form validation with Zod and React Hook Form
- Dark mode support

---

## Layout Structure

### Header/Navbar

The navigation bar includes:

- Logo and Site Name
- Home
- All Facilities
- My Bookings (Private)
- Add Facility (Private)
- Manage My Facilities (Private)

### Authentication Behavior

#### If User is Logged In

Profile dropdown shows:

- My Bookings
- Add Facility
- Manage My Facilities
- Logout

#### If User is Not Logged In

- Login button is displayed

---

## Important Packages Used

### Core Framework

- Next.js
- React
- React DOM

### Authentication

- better-auth
- @better-auth/mongo-adapter

### UI & Styling

- Tailwind CSS
- HeroUI
- Shadcn UI
- Radix UI
- Lucide React
- React Icons

### Form Handling & Validation
Hero ui forms


