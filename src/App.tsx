
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
import { AuthProvider } from '@/contexts/AuthContext';

// Move these protected route components outside of the main function component
// to prevent recreation on each render
const ProtectedRoute = React.lazy(() => import('@/components/ProtectedRoute'));

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      {(user) => (user?.role === 'admin' ? children : <Navigate to="/profile" />)}
    </ProtectedRoute>
  );
};

const ClubHeadRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      {(user) => (user?.role === 'club_head' ? children : <Navigate to="/profile" />)}
    </ProtectedRoute>
  );
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          {() => <Profile />}
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/credits",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          {() => <EnhancedCredits />}
        </ProtectedRoute>
      </React.Suspense>
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
      <AdminRoute>
        <ManageClubs />
      </AdminRoute>
    ),
  },
]);

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
