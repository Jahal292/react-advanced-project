import React, { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Grid,
  Tooltip,
  Center,
  Radio,
  RadioGroup,
  Image,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventItemCard } from "../components/EventItemCard";
import { useEvent } from "../components/EventContext";
import { ACTIONS } from "../components/eventReducer";
import { PopUp } from "../components/PopUp";
import { getCurrentDimension } from "../components/getCurrentDimension";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    events: await events.json(),
    categories: await categories.json(),
    screenSize: getCurrentDimension(),
  };
};

export const EventsPage = () => {
  const { events, categories, screenSize } = useLoaderData();
  const { dispatch, state } = useEvent();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showFilter, setShowFilter] = useState(false);
  const [radioValue, setRadioValue] = useState("no filter");

  const eventsBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(32, 39, 33, 0.9), rgba(0, 52, 0, 0.9), rgba(180, 195, 157, 0.73)), url("src/assets/Background.jpeg")`,
    backgroundSize: "cover",
    color: "white",
    padding: "20px",
  };

  const catsFiltered = ["no filter"];
  categories.map((cat) => {
    catsFiltered.push(cat.name);
  });

  useEffect(() => {
    if (screenSize.width > 700) {
      dispatch({ type: ACTIONS.FILTER_CATS, payload: radioValue });
    }
  }, [radioValue, dispatch, screenSize.width]);

  useEffect(
    () => {
      if (state.searchTerm === undefined || state.searchTerm === "") {
        if (screenSize.width > 700) {
          if (radioValue === "no filter") {
            setFilteredEvents(events);
          } else {
            const chosenCategory = categories.find(
              (category) => category.name === radioValue
            );
            const eventsWithCategory = events.filter((event) =>
              event.categoryIds.includes(chosenCategory.id)
            );
            setFilteredEvents(eventsWithCategory);
          }
        } else {
          if (state.categorySelected === "no filter") {
            setFilteredEvents(events);
          } else {
            const chosenCategory = categories.find(
              (category) => category.name === state.categorySelected
            );
            const eventsWithCategory = events.filter((event) =>
              event.categoryIds.includes(chosenCategory.id)
            );
            setFilteredEvents(eventsWithCategory);
          }
        }
      } else {
        if (screenSize.width > 700) {
          const eventInFilters = events.filter((event) =>
            event.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          );
          if (radioValue === "no filter") {
            setFilteredEvents(eventInFilters);
          } else {
            const chosenCategory = categories.find(
              (category) => category.name === radioValue
            );
            const eventsWithCategory = eventInFilters.filter((event) =>
              event.categoryIds.includes(chosenCategory.id)
            );
            setFilteredEvents(eventsWithCategory);
          }
        } else {
          const eventInFilters = events.filter((event) =>
            event.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          );
          if (state.categorySelected === "no filter") {
            setFilteredEvents(eventInFilters);
          } else {
            const chosenCategory = categories.find(
              (category) => category.name === state.categorySelected
            );
            const eventsWithCategory = eventInFilters.filter((event) =>
              event.categoryIds.includes(chosenCategory.id)
            );
            setFilteredEvents(eventsWithCategory);
          }
        }
      }
    },
    screenSize.width > 700
      ? [state.searchTerm, events, radioValue]
      : [state.searchTerm, events, state.categorySelected]
  );

  return (
    <Box
      pl={3}
      pt={1}
      pb={"300px"}
      style={eventsBgStyle}
      h={
        (filteredEvents.length < 4 && screenSize.width > 700) ||
        (filteredEvents.length < 1 && screenSize.width <= 700 && "100vh")
      }
    >
      {screenSize.width > 700 && (
        <>
          <PopUp
            show={showFilter}
            onClose={() => setShowFilter(false)}
            borderRad={"50%"}
            height={"25%"}
            showClose={true}
          >
            <RadioGroup
              onChange={setRadioValue}
              value={radioValue}
              name="filterCat"
            >
              {catsFiltered.map((cat) => (
                <Radio
                  key={cat}
                  value={cat}
                  pr={5}
                  colorScheme="orange"
                  sx={{
                    borderColor: "brand.200",
                    background: "brand.100",
                    paddingLeft: "5px",
                  }}
                >
                  {cat}
                </Radio>
              ))}
            </RadioGroup>
          </PopUp>
          <Tooltip label={"Press to change the filter"}>
            <Image
              src="/src/assets/Filter.png"
              h={"35px"}
              bg="brand.400"
              borderRadius={"50%"}
              p={1}
              _hover={{ backgroundColor: "brand.600" }}
              boxShadow={"2xl"}
              position="absolute"
              top="80px"
              right="20px"
              zIndex={1000}
              onClick={() => setShowFilter(true)}
            />
          </Tooltip>
        </>
      )}
      <Heading textAlign={"center"} color="brand.100" pt={10}>
        The events you want to attend!
      </Heading>
      <Center>
        <Grid
          alignContent={"center"}
          justifyContent={"center"}
          gridTemplateColumns={
            screenSize.width <= 700
              ? "1fr"
              : screenSize.width <= 1060
              ? "repeat(2, 1fr)"
              : screenSize.width <= 1366
              ? "repeat(3, 1fr)"
              : "repeat(4, 1fr)"
          }
          columnGap={8}
        >
          {filteredEvents &&
            filteredEvents.map((event) => {
              return (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <EventItemCard
                    event={event}
                    categories={event.categoryIds.map((e) => {
                      return categories.find((category) => category.id === e);
                    })}
                    screenSize={screenSize}
                  />
                </Link>
              );
            })}
        </Grid>
      </Center>
      <Center pt={6}>
        <Tooltip label={"Press the button to go to add-event-form"}>
          <Link to={`/createEvent`}>
            <Image
              src="/src/assets/New.png"
              h={"80px"}
              bg="brand.400"
              borderRadius={"50%"}
              _hover={{ backgroundColor: "brand.600" }}
              boxShadow={"2xl"}
            />
          </Link>
        </Tooltip>
      </Center>
    </Box>
  );
};
