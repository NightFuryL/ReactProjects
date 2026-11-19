import { RouterProvider } from "react-router";
import { router } from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Toasters ... */}
      <Toaster position="top-right" />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
