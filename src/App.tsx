import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Filter from "./pages/Filter";
import Chat from "./pages/chat";
import Auth from "./pages/auth";
import { useAppStore } from "./store";
import Room from "./pages/room";
import Request from "./pages/request";
import Contract from "./pages/contract";
import { useEffect } from "react";
import { customStorage } from "./utils/localStorage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  const { clearUserInfo } = useAppStore();

  useEffect(() => {
    const handleTabClose = () => {
      clearUserInfo();
      customStorage.removeItem('currentUser');
    };
    
    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [clearUserInfo]);

  // Nếu đã đăng nhập, cho phép truy cập (các route bảo mật như Chat)
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  // Nếu đã đăng nhập, chuyển hướng đến trang Home, nếu không thì hiển thị Auth
  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/request" element={<Request />} />
        <Route path="filter" element={<Filter />} />
        <Route path="/contract" element={<Contract />} />
        <Route
          path="chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        {/* Định tuyến con cho Auth */}
        <Route
          path="auth/*"
          element={
            <Routes>
              <Route
                path="login"
                element={
                  <AuthRoute>
                    <Auth type="login" />
                  </AuthRoute>
                }
              />
              <Route
                path="register"
                element={
                  <AuthRoute>
                    <Auth type="register" />
                  </AuthRoute>
                }
              />
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
