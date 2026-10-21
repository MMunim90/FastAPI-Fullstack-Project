import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AllBooks from "../pages/AllBooks";
import ErrorPage from "../pages/ErrorPage";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
