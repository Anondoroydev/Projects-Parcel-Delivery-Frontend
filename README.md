Parcel Delivery Frontend (React + Redux Toolkit + RTK Query)
============================================================

Project Overview
----------------

A secure, role-based frontend application for a Parcel Delivery System built with React.js, Redux Toolkit, and RTK Query. This application connects to a Node.js/Express backend to provide a seamless experience for Senders, Receivers, and Administrators to manage parcel deliveries.

Features
--------

### 🔓 Public Section

*   Landing page with service information
    
*   About page with company details
    
*   Contact form for inquiries
    
*   Public parcel tracking
    

### 🔐 Authentication

*   JWT-based login/logout
    
*   Role-based registration (Sender/Receiver)
    
*   Persistent authentication state
    
*   Protected routes based on user roles
    

### 📦 Sender Dashboard

*   Create new parcel delivery requests
    
*   View all created parcels with status tracking
    
*   Cancel parcels (if not dispatched)
    
*   Parcel status history and timeline
    

### 📬 Receiver Dashboard

*   View incoming parcels
    
*   Confirm parcel delivery
    
*   Delivery history tracking
    

### ⚙️ Admin Dashboard

*   User management (view, block/unblock)
    
*   Parcel management (view, update status)
    
*   Delivery personnel assignment (optional)
    
*   System analytics and reporting
    

### 📊 Data Visualization

*   Overview cards with parcel statistics
    
*   Charts showing delivery trends and status distribution
    
*   Paginated, searchable, and filterable data tables
    
*   Visual status timeline for parcels
    

Tech Stack
----------

### Frontend

*   **React** with TypeScript
    
*   **Redux Toolkit** for state management
    
*   **RTK Query** for API integration
    
*   **React Router** for navigation
    
*   **Tailwind CSS** for styling
    
*   **Chart.js/Recharts** for data visualization (optional)
    
*   **React Hook Form** for form handling (optional)
    
*   **React Toastify** for notifications (optional)
    

### Backend (Reference)

*   Node.js/Express REST API
    
*   MongoDB/Mongoose for data storage
    
*   JWT + bcrypt for authentication
    

Project Structure
-----------------

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (buttons, modals, etc.)
│   ├── layout/         # Layout components (header, sidebar, etc.)
│   └── parcels/        # Parcel-related components
├── features/           # Redux Toolkit feature slices
│   ├── auth/           # Authentication slice
│   ├── parcels/        # Parcel management slice
│   └── users/          # User management slice (admin)
├── pages/              # Page components
│   ├── public/         # Public pages (home, about, contact)
│   ├── auth/           # Authentication pages
│   └── dashboard/      # Role-specific dashboards
├── services/           # API service definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, icons)

```

Setup Instructions
------------------

### Prerequisites

*   Node.js (v14 or higher)
    
*   npm or yarn package manager
    
*   Backend API server (see backend repository)
    

### Installation

1.Clone the repository:
    
```bash
git clone
cd parcel-delivery-frontend
```
2.Install dependencies:
    
```bash
npm install  # or  yarn install
```

3.Create environment configuration:
    ```bash
    cp .env.example .env
    ```

    Edit the .env file with your configuration:
    ```bash   
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    REACT_APP_APP_NAME=Parcel Delivery System
    ```

4.Start the development server:
  
```bash 
npm start  # or  yarn start
```

5.Open [http://localhost:3000](http://localhost:3000/) to view the application.
    
### Building for Production

```bash
npm run build  # or  yarn build
```

This creates a build folder with optimized production files.

Available Scripts
-----------------

*   npm start - Runs the app in development mode
    
*   npm test - Launches the test runner
    
*   npm run build - Builds the app for production
    
*   npm run eject - Ejects from Create React App (one-way operation)
    

Deployment
----------

The application can be deployed to various platforms:

### Vercel

1.  Install Vercel CLI: npm i -g vercel
    
2.  Run vercel in the project directory
    
3.  Follow the prompts to deploy
    

### Netlify

1.  Build the project: npm run build
    
2.  Drag and drop the build folder to Netlify
    
3.  Or connect your repository for continuous deployment
    

### Other Platforms

The application can be deployed to any static hosting service that supports SPAs (Single Page Applications).

Usage
-----

1.  **As a Sender**:
    
    *   Register/Login with Sender role
        
    *   Create parcel delivery requests
        
    *   Track your parcels and view status history
        
    *   Cancel parcels if not yet dispatched
        
2.  **As a Receiver**:
    
    *   Register/Login with Receiver role
        
    *   View incoming parcels
        
    *   Confirm delivery of received parcels
        
3.  **As an Admin**:
    
    *   Login with admin credentials
        
    *   Manage users and parcels
        
    *   Update delivery statuses
        
    *   View system analytics
        

Contributing
------------

1.  Fork the repository
    
2.  Create a feature branch: git checkout -b feature-name
    
3.  Commit your changes: git commit -m 'Add feature'
    
4.  Push to the branch: git push origin feature-name
    
5.  Submit a pull request
    

License
-------

This project is licensed under the MY License.

Support
-------

For support, please open an issue in the GitHub repository or contact the me.

Acknowledgments
---------------

*   Icons from [LUCIDREACT](https://lucide.dev)
    
*   UI inspiration from modern dashboard designs Shadcn
    
*   Backend team for API development
