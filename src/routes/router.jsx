import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookDetails from "../components/pages/BookDetails";
import WishlistPage from "../components/pages/WishlistPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetails />,
  },
  {
    path: "/wishlists",
    element: <WishlistPage />,
  }
  
]);

export default router;
