import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routePaths } from "./routerConfig";
import GuestGuard from "./components/AuthControl/GuestGuard";
import ErrorBoundary from "./components/layout/ErrorBoundary/ErrorBoundary";
import AuthGuard from "./components/AuthControl/AuthGuard";
import Layout from "./components/layout/Layout/Layout";
import ErrorFallback from "./components/layout/ErrorBoundary/ErrorFallback";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import GettingStartedPage from "./components/pages/GettingStartedPage/GettingStartedPage";
import AdminPanelPage from "./components/pages/AdminPanelPage/AdminPanelPage";
import AuthenticationPage from "./components/pages/AuthenticationPage/AuthenticationPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={routePaths.authentication.path}
        element={
          <GuestGuard>
            <ErrorBoundary>
              <AuthenticationPage />
            </ErrorBoundary>
          </GuestGuard>
        }
      />
      <Route
        element={
          <AuthGuard>
            <ErrorBoundary>
              <Layout />
            </ErrorBoundary>
          </AuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path={routePaths.dashboard.reportNumber}
          element={<DashboardPage />}
        />
        <Route
          path={routePaths.gettingStarted.path}
          element={<GettingStartedPage />}
        />
        <Route path={routePaths.adminPanel.path} element={<AdminPanelPage />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route
        path={routePaths.notFound.path}
        element={<ErrorFallback errorMessage="wrongPath" />}
      />
      <Route path="*" element={<ErrorFallback errorMessage="wrongPath" />} />
    </>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
