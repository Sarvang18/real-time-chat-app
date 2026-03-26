# Real-Time Chat App

A full-stack, real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) along with Socket.io and Tailwind CSS.

## Getting Started

To run this project locally, you'll need to start both the backend server and the frontend development server.

### 1. Start the Backend
Open a terminal and navigate to the `backend` directory, then start the server:

```bash
cd backend
npm run dev
```
*(Runs on http://localhost:5001)*

### 2. Start the Frontend
Open a new, separate terminal, navigate to the `frontend` directory, and start Vite:

```bash
cd frontend
npm run dev
```
*(Runs on http://localhost:5173)*

### Features
- **Real-Time Messaging:** Instant message delivery using Socket.io
- **Online Presence:** See who is currently online in the chat
- **Rich Media:** Send images seamlessly via Cloudinary
- **Premium UI:** Glassmorphism and modern aesthetics using Tailwind CSS and DaisyUI
- **Secure Auth:** JWT-based authentication
