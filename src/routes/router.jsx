import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookDetails from "../components/pages/BookDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetails />,
  },
  
]);

export default router;
