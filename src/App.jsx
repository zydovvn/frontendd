// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "@/context/AuthContext";

import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminUsers from "@/pages/AdminUsers";
import AdminNotify from "@/pages/AdminNotify";
import Messages from "@/pages/Messages";
import MyPosts from "@/pages/MyPosts";
import CreatePost from "@/pages/CreatePost";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import ProductDetail from "@/components/product/ProductDetail";
import ProductGrid from "@/components/product/ProductGrid";
import SellerDashboard from "@/pages/SellerDashboard";
import PostEdit from "@/pages/PostEdit";

import SellerOrders from "@/pages/SellerOrders";
import BuyerOrders from "@/pages/BuyerOrders";
import OrderDetail from "@/pages/OrderDetail";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import VouchersPage from "@/pages/seller/VouchersPage.jsx";
import VoucherList from "@/pages/admin/VoucherList.jsx";
import VoucherEdit from "@/pages/admin/VoucherEdit.jsx";
import VoucherAssign from "@/pages/admin/VoucherAssign.jsx";
import VoucherRedemptions from "@/pages/admin/VoucherRedemptions.jsx";

import PrivateRoute from "@/components/common/PrivateRoute";
import PageWrapper from "@/components/common/PageWrapper";
import AdminChat from "@/components/chat/AdminChat";

// NEW: Provider filter danh mục
import { CategoryFilterProvider } from "@/context/CategoryFilterContext";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Trang chủ | UniTrade";
  }, []);

  return (
    <AuthProvider>
      {/* Bọc provider ở mức App để mọi trang dùng chung filter (single-select) */}
      <CategoryFilterProvider multiple={false} urlSync initial={null}>
        <div className="min-h-screen flex flex-col bg-white">
          <Sidebar />
          <Topbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <ScrollToTop /> {/* Cuộn lên đầu trang khi chuyển route */}
              <Routes location={location} key={location.pathname}>
                {/* Public */}
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login/></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register/></PageWrapper>} />
                <Route path="/products" element={<PageWrapper><ProductGrid/></PageWrapper>} />
                <Route path="/products/:id" element={<PageWrapper><ProductDetail/></PageWrapper>} />

                {/* Private */}
                <Route path="/favorites" element={<PrivateRoute><PageWrapper><Favorites/></PageWrapper></PrivateRoute>} />
                <Route path="/messages" element={<PrivateRoute><PageWrapper><Messages/></PageWrapper></PrivateRoute>} />
                <Route path="/myposts" element={<PrivateRoute><PageWrapper><MyPosts/></PageWrapper></PrivateRoute>} />
                <Route path="/post/create" element={<PrivateRoute><PageWrapper><CreatePost/></PageWrapper></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><PageWrapper><Profile/></PageWrapper></PrivateRoute>} />

                {/* Seller/Admin/Orders */}
                <Route path="/seller/dashboard" element={<PrivateRoute><PageWrapper><SellerDashboard/></PageWrapper></PrivateRoute>} />
                <Route path="/post/edit/:id" element={<PrivateRoute><PageWrapper><PostEdit/></PageWrapper></PrivateRoute>} />
                <Route path="/seller/orders" element={<PrivateRoute><PageWrapper><SellerOrders/></PageWrapper></PrivateRoute>} />
                <Route path="/orders/buyer" element={<PrivateRoute><PageWrapper><BuyerOrders/></PageWrapper></PrivateRoute>} />
                <Route path="/orders/:id" element={<PrivateRoute><PageWrapper><OrderDetail/></PageWrapper></PrivateRoute>} />

                <Route path="/admin/users" element={<PrivateRoute><PageWrapper><AdminUsers/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/notify" element={<PrivateRoute><PageWrapper><AdminNotify/></PageWrapper></PrivateRoute>} />

                {/* Vouchers */}
                <Route path="/seller/vouchers" element={<PrivateRoute><PageWrapper><VouchersPage/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/vouchers" element={<PrivateRoute><PageWrapper><VoucherList/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/vouchers/new" element={<PrivateRoute><PageWrapper><VoucherEdit mode="create"/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/vouchers/:id" element={<PrivateRoute><PageWrapper><VoucherEdit/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/vouchers/:id/assign" element={<PrivateRoute><PageWrapper><VoucherAssign/></PageWrapper></PrivateRoute>} />
                <Route path="/admin/vouchers/:id/redemptions" element={<PrivateRoute><PageWrapper><VoucherRedemptions/></PageWrapper></PrivateRoute>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <AdminChat />
        </div>
      </CategoryFilterProvider>
    </AuthProvider>
  );
}
