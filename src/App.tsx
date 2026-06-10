import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />;
    </>
  );
}
