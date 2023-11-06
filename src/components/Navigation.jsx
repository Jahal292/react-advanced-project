import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";
import { Text, Tooltip, Input, Stack, Image, Flex } from "@chakra-ui/react";

export const Navigation = ({ toggleMenu }) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useEvent();
  const [searchText, setSearchText] = useState("");

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    dispatch({ type: ACTIONS.FILTER_EVENTS, payload: searchText });
  }, [searchText, dispatch]);

  return (
    <Flex
      bg="brand.500"
      height={10}
      fontSize="xl"
      color="brand.100"
      boxShadow={"base"}
      justifySelf={"right"}
      pr={2}
      alignItems={"center"}
      justify={"space-between"}
    >
      <Text fontWeight={"bold"} paddingLeft={3} justifySelf={"flex-start"}>
        The event to attend
      </Text>

      {screenSize.width <= 700 ? (
        <Image
          justifySelf={"flex-end"}
          pr={2}
          src="/src/assets/Menu.png"
          height={8}
          p={1}
          _hover={{
            background: "brand.300",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            toggleMenu(setIsMenuOpen(!isMenuOpen));
          }}
        />
      ) : (
        <>
          <Flex>
            <Stack direction={"row"} height={8} mr={10}>
              <Input
                type="text"
                placeholder="Search..."
                bg="brand.100"
                height={6}
                fontSize={"sm"}
                color="brand.500"
                focusBorderColor="brand.300"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                alignSelf={"center"}
              />
              <Tooltip label="Click to search">
                <Image
                  src="/src/assets/Search.png"
                  height={8}
                  p={1}
                  alignSelf={"center"}
                  _hover={{
                    background: "brand.300",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Stack>
            <Flex justify={"space-between"}>
              <Tooltip label="Go to the list of events">
                <Text height={8} _hover={{ color: "brand.600" }} mr={5}>
                  <Link to="/">Events</Link>
                </Text>
              </Tooltip>
              <Tooltip label="Go to an event">
                <Text height={8} _hover={{ color: "brand.600" }} mr={5}>
                  <Link to="/event/1">Event</Link>
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};