import { useLoaderData, redirect, Form } from "react-router-dom";
import { InputField } from "../components/InputField";
import { convertToLocalDate } from "../components/convertDate";
import "moment-timezone";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Button,
  Center,
  Checkbox,
  Stack,
  Radio,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { isBefore } from "../components/isBefore";
import { getCurrentDimension } from "../components/getCurrentDimension";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    categories: await categories.json(),
    users: await users.json(),
    screenSize: getCurrentDimension(),
  };
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.createdBy = Number(formData.createdBy);
  formData.categoryIds = formData.categoryIds.split(",").map(Number);
  const getArrayStart = formData.startTime.split(" ");
  const revertDateStart = getArrayStart[0].split("-").reverse().join("-");
  formData.startTime = revertDateStart + "T" + getArrayStart[1] + ":00.000Z";
  const getArrayEnd = formData.endTime.split(" ");
  const revertDateEnd = getArrayEnd[0].split("-").reverse().join("-");
  formData.endTime = revertDateEnd + "T" + getArrayEnd[1] + ":00.000Z";
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const CreateEventsPage = () => {
  const { categories, users, screenSize } = useLoaderData();
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedUser, setSelectedUser] = useState();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [marginLR, setMarginLR] = useState();
  const toast = useToast();

  const createBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(32, 39, 33, 0.9), rgba(0, 52, 0, 0.9), rgba(180, 195, 157, 0.73)), url("src/assets/Background.jpeg")`,
    backgroundSize: "cover",
    color: "white",
    padding: "20px",
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  useEffect(() => {
    changeMarginLR();
  }, [screenSize]);

  const changeMarginLR = () => {
    setMarginLR((screenSize.width - 110 - 300) / 2);
    //110 is the width of the labels in the form
    //300 is the width of the controls in the form
  };

  return (
    <Box bg={"brand.600"} pt={5} pb={"200px"} style={createBgStyle}>
      <Heading mb={10} textAlign={"center"} color={"brand.100"}>
        Add a new event
      </Heading>
      <Form method="post" id="new-post-form">
        <Grid
          ml={[0, `${marginLR}px`]}
          mr={[0, `${marginLR}px`]}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateColumns={"1fr"}
          rowGap={8}
          color={"brand.300"}
          sx={{
            transform: screenSize.width <= 700 && `translateX(20px)`,
          }}
        >
          <FormControl isRequired>
            <InputField
              labelText="Title"
              nameText="title"
              screenSize={screenSize}
            />
            <FormHelperText
              ml={screenSize.width <= 700 ? 0 : 110}
              color="brand.400"
            >
              Make it a fancy one.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 700 ? "300px" : "110px 300px"
              }
            >
              <FormLabel>Description</FormLabel>
              <Textarea
                bg={"brand.100"}
                placeholder="Please, add some info of the event"
                name="description"
                focusBorderColor="brand.300"
              />
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <InputField
              labelText="Image url"
              nameText="image"
              screenSize={screenSize}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              labelText="Location"
              nameText="location"
              screenSize={screenSize}
            />
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 700 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Created by</FormLabel>
              <Stack spacing={3}>
                {users.map((user) => {
                  return (
                    <Radio
                      value={user.id}
                      key={user.id}
                      colorScheme="green"
                      isChecked={selectedUser === user.id}
                      onClick={() => setSelectedUser(user.id)}
                      name="createdBy"
                      sx={{
                        borderColor: "brand.200",
                        background: "brand.100",
                        paddingLeft: "5px",
                      }}
                    >
                      {user.name}
                    </Radio>
                  );
                })}
              </Stack>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 700 ? 300 : "110px 300px"
              }
              alignItems={"center"}
            >
              <FormLabel>Category</FormLabel>
              <Stack>
                {categories.map((category) => {
                  return (
                    <Checkbox
                      colorScheme="green"
                      color="brand.500"
                      key={category.id}
                      name="categoryIds"
                      value={Array.from(selectedCategories)}
                      isChecked={selectedCategories.has(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      sx={{
                        borderColor: "brand.200",
                        backgroundColor: "brand.100",
                        paddingLeft: "5px",
                        borderRadius: "20px",
                      }}
                    >
                      {category.name}
                    </Checkbox>
                  );
                })}
              </Stack>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 700 ? 300 : "110px 300px"
              }
              alignItems={"center"}
              color="brand.500"
            >
              <FormLabel color="brand.300">Start</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectStart
                  selected={startDateTime}
                  onChange={(date) =>
                    setStartDateTime(convertToLocalDate(date))
                  }
                  showTimeSelect
                  dateFormat="dd-MM-yyy HH:mm"
                  name="startTime"
                  width="300px"
                  className="custom-datepicker-input"
                />
              </div>
            </Grid>
            <Grid
              gridTemplateColumns={
                screenSize.width <= 700 ? 300 : "110px 300px"
              }
              alignItems={"center"}
              color="brand.500"
            >
              <FormLabel color="brand.300">End</FormLabel>
              <div style={{ fontSize: "0.9em" }}>
                <DatePicker
                  selectsEnd
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(convertToLocalDate(date))}
                  endDate={endDateTime}
                  startDate={startDateTime}
                  minDate={startDateTime}
                  showTimeSelect
                  dateFormat="dd-MM-yyy HH:mm"
                  name="endTime"
                />
              </div>
            </Grid>
          </FormControl>
        </Grid>
        <Center>
          {isBefore(endDateTime, startDateTime) ? (
            <Text
              color="darkred"
              fontSize={"lg"}
              fontWeight={"semibold"}
              mt={8}
            >
              The end date-time is before or at the start date-time. This is not
              allowed.
            </Text>
          ) : (
            <Button
              type="submit"
              mt={10}
              bg="brand.200"
              color="brand.100"
              borderColor={"brand.400"}
              borderWidth={3}
              _hover={{
                background: "brand.100",
                color: "brand.400",
                borderColor: "brand.400",
              }}
              onClick={() =>
                toast({
                  title: "Whoop whoop! Done 🎉!",
                  description: "The event you created is added.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              Add event
            </Button>
          )}
        </Center>
      </Form>
    </Box>
  );
};