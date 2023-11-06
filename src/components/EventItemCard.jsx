import { getTime } from "./getTime";
import { getDate } from "./getDate";
import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Heading,
  Tag,
  Center,
} from "@chakra-ui/react";

export const EventItemCard = ({ event, categories }) => {
  return (
    <Card
      mt={8}
      width={["300px", "340px"]}
      boxShadow="2xl"
      bg="brand.200"
      cursor={"pointer"}
      _hover={{
        opacity: 0.6,
        transform: "scale(.95)",
        filter: "auto",
        blur: "0.5px",
      }}
    >
      <CardBody>
        <Center>
          <Image
            src={event.image}
            height={200}
            width={"80%"}
            borderRadius={"xl"}
          />
        </Center>
        <Stack mt="6" spacing="3" alignItems={"center"}>
          <Heading size="md" textAlign={"center"} color="brand.300">
            {event.title}
          </Heading>
          <Stack direction={"row"}>
            <Text color="brand.400" fontSize="sm">
              Description:
            </Text>
            <Text color="brand.100" fontSize="sm" fontWeight={"semibold"}>
              {" "}
              {event.description}
            </Text>
          </Stack>
          <Stack direction={"row"} color="brand.400" fontSize="sm">
            <Text>Date:</Text>
            <Text color="brand.100" fontSize="sm" fontWeight={"semibold"}>
              {getDate(event.startTime).props.children ===
              getDate(event.endTime).props.children
                ? `${getDate(event.startTime).props.children}`
                : `${getDate(event.startTime).props.children} - ${
                    getDate(event.endTime).props.children
                  }`}
            </Text>
          </Stack>
          <Stack direction={"row"} color="brand.400" fontSize="sm">
            <Text>Time:</Text>
            <Text color="brand.100" fontSize="sm" fontWeight={"semibold"}>
              {" "}
              {getDate(event.startTime).props.children ===
              getDate(event.endTime).props.children
                ? `${getTime(event.startTime).props.children} - ${
                    getTime(event.endTime).props.children
                  }`
                : `${getTime(event.startTime).props.children} (startdate) - ${
                    getTime(event.endTime).props.children
                  } (enddate)`}
            </Text>
          </Stack>
        </Stack>
        <Center mt={3}>
          {categories.map((category) => (
            <Tag
              key={category.id}
              size={"sm"}
              maxBlockSize={2}
              bg="brand.300"
              m={2}
              textAlign={"center"}
              color="brand.500"
              fontWeight={"semibold"}
              py={1}
              textTransform={"uppercase"}
            >
              {category.name}
            </Tag>
          ))}
        </Center>
      </CardBody>
    </Card>
  );
};