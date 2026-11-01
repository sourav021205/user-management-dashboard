import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";

import UserListPage from "../pages/UserListPage";
import LoadingState from "../components/LoadingState";

const UserDetailPage = lazy(function () {
  return import("../pages/UserDetailPage");
});

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path="/" element={<UserListPage />} />

          <Route path="/users/:id" element={<UserDetailPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
