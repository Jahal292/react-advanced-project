import React, { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Menu } from "../components/Menu";
import { Box, Image, Text, Button, Stack, Flex } from "@chakra-ui/react";
import { EventProvider } from "./EventContext";
import { Footer } from "./Footer";
import { PopUp } from "./PopUp";
import { CookiesShower } from "./CookiesShower";
import "./cookies.css";
import { TrashCookie } from "./TrashCookie";
import { getCurrentDimension } from "./getCurrentDimension";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
    screenSize: getCurrentDimension(),
  };
};

export const Root = () => {
  const { categories } = useLoaderData();
  const [showMenu, setShowMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [ShowPopup, setShowPopup] = useState(true);
  const [showCookies, setShowCookies] = useState(false);
  const [noCookie, setNoCookie] = useState(false);

  const handleYes = () => {
    setShowCookies(true);
    setShowPopup(false);
  };

  if (showCookies) {
    setTimeout(() => {
      setShowCookies(false);
    }, 10000);
  }

  const handleNo = () => {
    setShowPopup(false);
    setNoCookie(true);
  };

  if (noCookie) {
    setTimeout(() => {
      setNoCookie(false);
    }, 4000);
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return (
    <EventProvider>
      <PopUp
        show={ShowPopup}
        onClose={() => setShowPopup(false)}
        height={screenSize.width <= 700 ? "35%" : "25%"}
        borderRad={"20px"}
        showClose={false}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          transform={screenSize.width <= 700 && "translate(10%, -5%)"}
        >
          {screenSize.width > 700 && (
            <Image
              src="/src/assets/CookieMonster.png"
              h={screenSize.width > 1024 ? "300px" : "200px"}
              transform={
                screenSize.width > 1024 ? "translate(-20%)" : "translate(-50%)"
              }
            />
          )}
          <Stack
            direction={"column"}
            mt={5}
            transform={
              screenSize.width <= 700
                ? "translate(-10%)"
                : screenSize.width > 1024
                ? "translate(-10%)"
                : "translate(-22%)"
            }
          >
            <Text color="brand.200" textAlign={"center"}>
              Do you also want some cookies?
            </Text>
            <Stack direction={screenSize.width < 700 ? "column" : "row"} pt={5}>
              <Button
                bg="brand.600"
                _hover={{ backgroundColor: "brand.300" }}
                onClick={handleYes}
              >
                Mmmm, yes please!
              </Button>
              <Button
                bg="brand.600"
                _hover={{ backgroundColor: "brand.300" }}
                onClick={handleNo}
              >
                No thanks, I am full
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </PopUp>
      {showCookies && <CookiesShower show />}
      {noCookie && <TrashCookie screenSize={screenSize} />}
      <Box>
        <Navigation toggleMenu={() => setShowMenu(!showMenu)} />
        {showMenu && <Menu categories={categories} />}
        <Outlet screenSize={screenSize} />
        <Footer screenSize={screenSize} />
      </Box>
    </EventProvider>
  );
};
