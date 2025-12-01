
import HomePage from "./components/homepage/HomePage";
import Login from "./components/Login";
import SignupForm from "./components/Signup";
import Todo from "./components/Todo";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import Error404 from "./Error404";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <ProtectedRoute isLoginOrSignup={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute isLoginOrSignup={true}>
              <SignupForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
