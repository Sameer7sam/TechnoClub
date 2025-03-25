import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import EnhancedCredits from '@/pages/EnhancedCredits';
import ClubHeadTools from '@/components/ClubHeadTools';
import AdminTools from '@/components/AdminTools';
import ManageClubs from '@/pages/ManageClubs';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/profile" />;
  }
  return children;
};

const ClubHeadRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isClubHead } = useAuth();
  if (!isAuthenticated || !isClubHead()) {
    return <Navigate to="/profile" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/credits",
    element: (
      <ProtectedRoute>
        <EnhancedCredits />
      </ProtectedRoute>
    ),
  },
  {
    path: "/clubhead-tools",
    element: (
      <ClubHeadRoute>
        <ClubHeadTools />
      </ClubHeadRoute>
    ),
  },
  {
    path: "/admin-tools",
    element: (
      <AdminRoute>
        <AdminTools />
      </AdminRoute>
    ),
  },
  {
    path: "/manage-clubs",
    element: (
      <ProtectedRoute>
        <ManageClubs />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
