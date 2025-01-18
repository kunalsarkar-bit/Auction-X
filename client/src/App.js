import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "./redux/AuthSlice";
import "./App.css";

// Layouts
import AdminLayout from "./layouts/Admin/AdminLayout";
import UserLayout from "./layouts/User/UserLayout";

// Admin Pages
import DashBoard from "./pages/Admin/Dashboard/Dashboard";
import Orders from "./pages/Admin/Orders/Orders";
import Customers from "./pages/Admin/Customers/Customers";
import Inventory from "./pages/Admin/Inventory/Inventory";
import AdminFeedback from "./pages/Admin/Feedback/AdminFeedback";

// User Pages
import Home from "./pages/User/Home/Home";
import SellAnItem from "./pages/User/SellAnItem/SellAnItem";
import BidAnItem from "./pages/User/BidAnItem/BidAnItem";
import Login from "./pages/Login/Login/Login";
import VerifyProfilePage from "./pages/Login/VerifyProfilePage/VerifyProfilePage";
import VerifyGProfilePage from "./pages/Login/VerifyGProfilePage/VerifyGProfilePage";
import OTPInput from "./pages/Login/OTP/OTPInput";
import ForgetPassword from "./pages/Login/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Login/ResetPassword/ResetPassword";
import OTPverify from "./pages/Login/OTPVerify/OTPVerify";
import BidHistory from "./pages/User/Dropdown/BidHistory/BidHistory";
import BidHistoryDetails from "./pages/User/Dropdown/BidHistory/BidHistoryDetails";

// Footer Pages (User)
import AboutUs from "./pages/Footer/About/AboutUs";
import AboutUsTwo from "./pages/Footer/About/AboutUs2";
import ContactUs from "./pages/Footer/About/ContactUs";
import WhyUs from "./pages/Footer/About/WhyUs";

// Consumer Policy Pages
import Privacy from "./pages/Footer/ConsumerPolicy/Privacy";
import Security from "./pages/Footer/ConsumerPolicy/Security";
import TermsAndConditions from "./pages/Footer/ConsumerPolicy/TermsAndConditions";

// Help Pages
import FAQ from "./pages/Footer/Help/FAQ";
import Payment from "./pages/Footer/Help/Payment";
import Report from "./pages/Footer/Help/Report";
import Shipping from "./pages/Footer/Help/Shipping";
import Feedback from "./pages/Footer/Help/Feedback";

// Page Not Found
import PageNotFound from "./pages/Others/PageNotFound/PageNotFound";

// Components
import { Toaster } from "react-hot-toast";
import ProfilePage2 from "./pages/User/Dropdown/Profile/ProfilePage2";
import SellerHistoryPage from "./pages/User/Dropdown/pendingbids/SellerHistoryPage";
import UpdateSeller from "./components/SellAnItemForm/UpdateAnItem";
import SearchAndPostDetail from "./pages/User/SearchAndPostDetail/SearchAndPostDetail";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import PaymentPage from "./pages/User/Dropdown/Payment/Payment";
import ScrollToTop from "./components/Scroll/Scroll";
import ScrollToTopManual from "./components/ScrollToTop/ScrollToTop";
import CategoryList from "./components/CategoryList/CategoryList";
import TodayBid from "./components/Banner3/TodayBid";
import TomorrowBid from "./components/Banner3/TomorrowBid";

// Protected Route
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const useCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};

const App = () => {
  const dispatch = useDispatch();
  const currentPath = useCurrentPath();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  const hiddenPaths = [
    "/login",
    "/verifyprofile",
    "/verifyGprofile",
    "/forgetpassword",
    "/resetpassword",
  ];
  const showNavbarAndFooter = !hiddenPaths.includes(currentPath);

  return (
    <>
      <ScrollToTopManual />
      <ScrollToTop />
      <Toaster />
      <Routes>
        {/* User routes wrapped with UserLayout */}
        <Route
          element={<UserLayout showNavbarAndFooter={showNavbarAndFooter} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/security" element={<Security />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/whyus" element={<WhyUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/report" element={<Report />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/posts/:id" element={<SearchAndPostDetail />} />
          <Route path="/about2" element={<AboutUsTwo />} />
          <Route path="/bid" element={<BidAnItem />} />
          <Route path="/category/:category" element={<CategoryList />} />
          <Route path="/todaybid" element={<TodayBid />} />
          <Route path="/tomorrowbid" element={<TomorrowBid />} />
        </Route>

        {/* Admin routes wrapped with AdminLayout */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashBoard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="/admin/feedback/:id" element={<AdminFeedback />} />
          </Route>
        </Route>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route
            element={<UserLayout showNavbarAndFooter={showNavbarAndFooter} />}
          >
            <Route path="/myprofile" element={<ProfilePage2 />} />
            <Route path="/pendingbids" element={<SellerHistoryPage />} />
            <Route path="/pendingbids/update/:id" element={<UpdateSeller />} />
            <Route path="/balance" element={<PaymentPage />} />
            <Route path="/sell" element={<SellAnItem />} />
            <Route path="/orders" element={<BidHistory />} />
            <Route path="/order/:id" element={<BidHistoryDetails />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
        </Route>

        {/* Login and Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/verifyprofile" element={<VerifyProfilePage />} />
        <Route path="/verifyGprofile" element={<VerifyGProfilePage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/OTP" element={<OTPInput />} />
        <Route path="/OTPverify" element={<OTPverify />} />

        {/* Page Not Found route */}
        <Route path="/pagenotfound" element={<PageNotFound />} />
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/pagenotfound" replace />} />
      </Routes>
    </>
  );
};

const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
