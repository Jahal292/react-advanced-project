import { EventEditSubItem_Title } from "./EventEditSubItems/EventEditSubItem_Title";
import { EventEditSubItem } from "./EventEditSubItem";
import { EventShowSubItem } from "../components/EventShowSubItem";
import { TYPES } from "../pages/EventPage";

export const EventSubItem = ({
  isEditable,
  eventItem,
  imgUrl,
  date,
  typeInput,
  width,
  direction,
}) => {
  return (
    <>
      {!isEditable ? (
        <EventShowSubItem
          eventItem={eventItem}
          date={date}
          imgUrl={imgUrl}
          typeInput={typeInput}
        />
      ) : typeInput === TYPES.TITLE ? (
        <EventEditSubItem_Title eventItem={eventItem} />
      ) : (
        <EventEditSubItem
          eventItem={eventItem}
          imgUrl={imgUrl}
          typeInput={typeInput}
          width={width}
          direction={direction}
        />
      )}
    </>
  );
};