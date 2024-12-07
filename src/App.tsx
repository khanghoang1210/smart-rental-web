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
import RoomDetail from "./components/room/RoomDetail";
import ContractManagementPage from "./pages/ContractManagementPage";
import InvoicePage from "./pages/invoice/InvoicePage";
import Payment from "./pages/payment";
import BillManagementPage from "./pages/invoice/BillManagementPage";
import ProcessTracking from "./pages/process-tracking";
import ReturnRequestPage from "./pages/request/ReturnRequestPage";
import ReturnRequestMangement from "./pages/request/ReturnRequestMangement";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  const { clearUserInfo } = useAppStore();

  useEffect(() => {
    const handleTabClose = () => {
      clearUserInfo();
      customStorage.removeItem("currentUser");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [clearUserInfo]);

  // Nếu đã đăng nhập, cho phép truy cập (các route bảo mật như Chat)
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/create" element={<Room />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/request" element={<Request />} />
        <Route path="/return-request" element={<ReturnRequestPage />} />
        <Route path="/return-request/manage" element={<ReturnRequestMangement />} />
        <Route path="filter" element={<Filter />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/contract/manage" element={<ContractManagementPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/invoice/manage" element={<BillManagementPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/process-tracking" element={<ProcessTracking />} />

        <Route
          path="chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
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
