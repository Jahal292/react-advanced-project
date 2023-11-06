import { Stack, Image, Center, Tooltip, Editable } from "@chakra-ui/react";
import { TYPES } from "../pages/EventPage";
import {EventEditSubItem_Descr} from "./EventEditSubItems/EventEditSubItem_Descr"
import { EventEditSubItem_Loc } from "./EventEditSubItems/EventEditSubItem_Loc";
import { EventEditSubItem_DateStart } from "./EventEditSubItems/EventEditSubItem_DateStart";
import { EventEditSubItem_DateEnd } from "./EventEditSubItems/EventEditSubItem_DateEnd";
import { EventEditSubItem_Cats } from "./EventEditSubItems/EventEditSubItem_Cats";

export const EventEditSubItem = ({
  eventItem,
  imgUrl,
  typeInput,
  width,
  direction,
}) => {
  return (
    <Stack direction="row">
      <Center>
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
        <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
          {typeInput === TYPES.DESCRIPTION ? (
            <EventEditSubItem_Descr eventItem={eventItem} width={width} />
          ) : typeInput === TYPES.LOCATION ? (
            <EventEditSubItem_Loc eventItem={eventItem} width={width} />
          ) : typeInput === TYPES.DATE_START ? (
            <EventEditSubItem_DateStart eventItem={eventItem} />
          ) : typeInput === TYPES.DATE_END ? (
            <EventEditSubItem_DateEnd eventItem={eventItem} />
          ) : (
            typeInput === TYPES.CATEGORIES && (
              <EventEditSubItem_Cats
                eventItem={eventItem}
                direction={direction}
              />
            )
          )}
        </Editable>
      </Center>
    </Stack>
  );
};