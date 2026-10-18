import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AllBooks from "../pages/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <AboutUs/>
        },
        {
            path: '/contact',
            element: <ContactUs/>
        },
        {
            path: '/allBooks',
            element: <AllBooks/>
        },
    ]
  },
]);

export default router;