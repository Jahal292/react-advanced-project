import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  CreateEventsPage,
  loader as createEventLoader,
  action as createEvent,
} from "./pages/CreateEventPage";
import { EventPage, loader as eventDetailLoader } from "./pages/EventPage";
import { EventsPage, loader as eventListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader } from "./components/Root";

//extend the theme
const colors = {
  brand: {
    100: "#FAF5E9", //Sleek White
    200: "#003400", //Serpentine Shadow
    300: "#FECB00", //Philippine Yellow
    400: "#B4C39D", //Wasabi Peanut
    500: "#202721", //Young Night
    600: "#009B4D", //Link Green
  },
};

const fonts = {
  heading: "Nunito",
  body: "Nunito",
};

const theme = extendTheme({
  colors,
  fonts,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventDetailLoader,
      },
      {
        path: "/createEvent",
        element: <CreateEventsPage />,
        loader: createEventLoader,
        action: createEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);