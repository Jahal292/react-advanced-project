import { getTime } from "./getTime";
import { getDate } from "./getDate";
import { TYPES } from "../pages/EventPage";
import { Stack, Text, Image, Center, Tooltip } from "@chakra-ui/react";

export const EventShowSubItem = ({ eventItem, imgUrl, typeInput }) => {
  const getOutput = (eventItem, typeInput) => {
    if (typeInput === TYPES.DATE) {
      const output = (
        <span>
          {getDate(eventItem[0]).props.children} -{" "}
          {getTime(eventItem[0]).props.children} <br />
          until
          <br />
          {getDate(eventItem[1]).props.children} -{" "}
          {getTime(eventItem[1]).props.children}
        </span>
      );
      return output;
    } else if (typeInput === TYPES.CATEGORIES) {
      const output = eventItem.join(", ");
      return output;
    } else {
      const output = eventItem;
      return output;
    }
  };

  return (
    <Stack direction="row">
      <Center>
        {typeInput !== TYPES.TITLE && (
          <Tooltip label={typeInput}>
            <Image
              src={imgUrl}
              height={10}
              p={2}
              bg="brand.200"
              borderRadius="full"
              mr={5}
              alt={typeInput}
            />
          </Tooltip>
        )}
        <Text textAlign={"center"} color="black">
          {getOutput(eventItem, typeInput)}
        </Text>
      </Center>
    </Stack>
  );
};