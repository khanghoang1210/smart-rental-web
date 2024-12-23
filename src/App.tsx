import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
import { useCookies } from "react-cookie";
import ContractTemplate from "./components/contract/form/PreviewForm";
import ConfirmationSuccess from "./components/return-request/ConfirmationSuccess";
import AccountPage from "./pages/account";
import DashboardPage from "./pages/dashboard";
import FavoriteRoomPage from "./pages/room/FavoriteRoomPage";
import PaymentInfo from "./pages/payment/PaymentInfo";
import PaymentInfoPage from "./pages/payment/PaymentInfo";
import IndexPage from "./pages/index";
import PostedRoomPage from "./pages/room/PostedRoomPage";
import ProfilePage from "./pages/account/UserProfilePage";

type DecodedToken = {
  exp: number; // expiration timestamp
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const isAuthenticated = !!token;
  const { clearUserInfo } = useAppStore();

  useEffect(() => {
    // Check token expiration
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
          removeCookie("token");
          clearUserInfo();
          customStorage.removeItem("currentUser");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        removeCookie("token");
        clearUserInfo();
        customStorage.removeItem("currentUser");
      }
    }
  }, [token, removeCookie, clearUserInfo]);

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const isAuthenticated = !!token;

  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  const RequestWithID = () => {
    const { id } = useParams<{ id: string }>();
    return <Request requestID={id ? parseInt(id) : null} />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/create" element={<Room />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route
          path="/request"
          element={
            <PrivateRoute>
              <Request />
            </PrivateRoute>
          }
        />
        <Route
          path="/request/:id"
          element={
            <PrivateRoute>
              <RequestWithID />
            </PrivateRoute>
          }
        />
        <Route path="/return-request" element={<ReturnRequestPage />} />
        <Route
          path="/return-request/success"
          element={<ConfirmationSuccess />}
        />
        <Route
          path="/return-request/manage"
          element={<ReturnRequestMangement />}
        />
        <Route path="filter" element={<Filter />} />
        <Route path="/contract/create" element={<Contract />} />
        <Route path="/contract/preview" element={<ContractTemplate />} />
        <Route path="/contract" element={<ContractManagementPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route
          path="/invoice/manage"
          element={
            <PrivateRoute>
              <BillManagementPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/room/favorite"
          element={
            <PrivateRoute>
              <FavoriteRoomPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/room/posted"
          element={
            <PrivateRoute>
              <PostedRoomPage />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/info" element={<PaymentInfoPage />} />
        <Route path="/process-tracking" element={<ProcessTracking />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

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
