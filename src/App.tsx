import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Filter from "./pages/Filter";
import Chat from "./pages/chat";
import Auth from "./pages/auth";
import { useAppStore } from "./store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  // If authenticated, allow access to the children (protected routes like Chat)
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  // If authenticated, redirect to Home, otherwise show the Auth page
  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="filter" element={<Filter />} />
        <Route
          path="chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
