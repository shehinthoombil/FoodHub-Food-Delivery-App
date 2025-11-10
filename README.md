🍔 FoodHub – Food Delivery Web Application (Frontend)

Welcome to the frontend repository of FoodHub, a modern and responsive food delivery platform built with React.js and Tailwind CSS.
FoodHub allows users to browse restaurants, explore menus, manage carts, and checkout with ease — all with seamless localStorage-based persistence.

📚 Table of Contents

Overview

Features

Technologies Used

Installation

Project Structure

Deployment

Evaluation Checklist

Troubleshooting

Contact

🧭 Overview

The FoodHub frontend is developed using React.js with React Router for navigation and Tailwind CSS for styling.
It features a clean, responsive, and modern user interface that supports real-time updates via Context API and data persistence through localStorage.
This project is fully frontend-based and does not require any backend setup.

✨ Features

🍽️ Pages – Home, Menu, Cart, Checkout, Login, and Register

🛒 Cart Management – Add, update, and remove items

💾 Data Persistence – Uses localStorage for user and cart data

🔍 Search & Filter – Find items or filter by category

📱 Responsive Design – Works across mobile, tablet, and desktop

🎨 Modern UI/UX – Built with Tailwind CSS

🧠 State Management – Context API for global app state

🧩 Mock Data – No backend required

⚙️ Technologies Used
Technology	Purpose
React.js	Core frontend framework
React Router DOM	Page navigation
Tailwind CSS	Styling and responsiveness
Lucide React	Icon library
localStorage	Persistent cart and user data
Vite	Fast build tool for development
🚀 Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/FoodHub-Food-Delivery.git
cd FoodHub-Food-Delivery

2️⃣ Install Dependencies
npm install

3️⃣ Run the Application
npm run dev


Your app will be available at:
👉 http://localhost:5173

🗂️ Project Structure
src/
├── components/
│   └── Header.jsx
├── contexts/
│   └── AppContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx
├── main.jsx
└── index.css

🌐 Deployment (Vercel)
Using Vercel CLI
npm install -g vercel
vercel


Or:

Visit Vercel

Click "New Project"

Import your GitHub repository

Click "Deploy" 🚀

Your app will be live in minutes!

✅ Evaluation Checklist
Criteria	Implementation
UI/UX Design	✅ Clean and modern design
Responsiveness	✅ Mobile-first responsive design
Functionality	✅ Full cart, filter, and login features
Routing	✅ Implemented using React Router
State Management	✅ Context API with localStorage persistence
Code Quality	✅ Clean, modular, and reusable components
🧩 Troubleshooting

🧱 “Module not found” errors

npm install


🎨 Tailwind not working?
Ensure index.css includes:

@tailwind base;
@tailwind components;
@tailwind utilities;


🌍 404 Error on refresh (Vercel)
Add a vercel.json file in root:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

👨‍💻 Contact

Author: Mohammed Shehin
📧 Email: shehinthoombil@gmail.com
]
💼 LinkedIn: linkedin.com/in/mohammedshehin

🐙 GitHub: github.com/mohammedshehin
