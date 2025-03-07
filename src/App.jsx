import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";
import { EmployeeList } from "./components/EmployeeList";
import { LoginPage } from "./components/LoginPage";
import { DashboardList } from "./components/DashboardList";
import { ShowEmployeeeList } from "./components/ShowEmployeeeList";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
    },
    {
      path: "/LoginPage",
      element: <LoginPage />,
    },
    {
      path: "/Dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "",
          element: <DashboardList />,
        },
        {
          path: "EmployeeList",
          element: <EmployeeList />,
        },
        {
          path: "ShowEmployeeeList/:employeeId",
          element: <ShowEmployeeeList />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
