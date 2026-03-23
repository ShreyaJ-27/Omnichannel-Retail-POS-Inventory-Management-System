# 🛒 Omnichannel Retail POS & Inventory Management System

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive Point of Sale (POS) and inventory management system built with React, Vite, and Tailwind CSS. Designed for seamless omnichannel retail operations with an intuitive user interface and robust functionality.

## ✨ Features

### 🏪 Point of Sale (POS)
- **Real-time Cart Management**: Add, remove, and modify items instantly
- **Product Search**: Quick search and filtering of products
- **Billing & Payments**: Multiple payment methods with receipt generation
- **Discounts & Promotions**: Apply discounts and promotional codes

### 📦 Inventory Management
- **Stock Tracking**: Monitor inventory levels in real-time
- **Product Management**: Add, edit, and categorize products
- **Low Stock Alerts**: Automatic notifications for restocking needs
- **Supplier Integration**: Manage supplier information and orders

### 📊 Order Management
- **Order History**: View and track all past transactions
- **Order Status Updates**: Real-time order status tracking
- **Customer Management**: Store customer details and purchase history
- **Reporting**: Generate sales reports and analytics

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for user preference
- **Intuitive UI**: Clean, modern interface with smooth animations
- **Accessibility**: Built with accessibility best practices

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Zustand for lightweight state management
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Ready for deployment on Vercel, Netlify, or any static hosting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShreyaJ-27/Omnichannel-Retail-POS-Inventory-Management-System.git
   cd Omnichannel-Retail-POS-Inventory-Management-System
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Visit `http://localhost:3000` to view the application.

## 📖 Usage

### For Retail Staff
1. **POS Operations**: Use the POS page to process customer transactions
2. **Product Search**: Quickly find products using the search functionality
3. **Payment Processing**: Accept various payment methods and print receipts

### For Inventory Managers
1. **Stock Management**: Monitor and update inventory levels
2. **Product Catalog**: Add new products and manage categories
3. **Reports**: Generate inventory and sales reports

### For Administrators
1. **Order Tracking**: View all orders and their statuses
2. **Customer Insights**: Analyze customer behavior and preferences
3. **System Configuration**: Customize settings and themes

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BillingSummary.jsx
│   │   ├── Cart.jsx
│   │   ├── Navbar.jsx
│   │   ├── PaymentModal.jsx
│   │   ├── ProductSearch.jsx
│   │   └── Receipt.jsx
│   ├── pages/
│   │   ├── Inventory.jsx
│   │   ├── Orders.jsx
│   │   └── POS.jsx
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── cartStore.js
│   │   ├── orderStore.js
│   │   └── themeStore.js
│   ├── utils/
│   │   └── calculateBill.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ for modern retail operations**