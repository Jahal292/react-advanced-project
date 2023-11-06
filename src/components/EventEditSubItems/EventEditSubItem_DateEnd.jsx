import { useState, useEffect } from "react";
import { getTime } from "../getTime";
import { getDate } from "../getDate";
import { useEvent } from "../EventContext";
import { ACTIONS } from "../eventReducer";
import { parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import { isBefore } from "../isBefore";
import "../../pages/react-datepicker.css";
import { Stack, Text } from "@chakra-ui/react";

export const EventEditSubItem_DateEnd = ({ eventItem }) => {
  const { dispatch } = useEvent();
  const { state } = useEvent();
  const [editDate, setEditDate] = useState(false);
  const [newEnd, setNewEnd] = useState(new Date(eventItem));

  useEffect(() => {
    const editEnd = parseISO(newEnd.toISOString());
    if (editEnd && state.editStart && newEnd) {
      const dateCheck = isBefore(
        parseISO(newEnd.toISOString()),
        parseISO(state.editStart)
      );
      dispatch({ type: ACTIONS.EDIT_END, payload: editEnd });
      dispatch({ type: ACTIONS.DATE_CHECK, payload: dateCheck });
    }
  }, [state.editStart, newEnd, dispatch, eventItem]);

  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem).props.children} -{" "}
        {getTime(eventItem).props.children}
      </span>
    );
    return output;
  };

  return (
    <>
      {editDate ? (
        <Stack direction={"column"}>
          <DatePicker
            selectsEnd
            selected={newEnd}
            onChange={(date) => setNewEnd(date)}
            endDate={newEnd}
            startDate={parseISO(state.editStart)}
            minDate={parseISO(state.editStart)}
            showTimeSelect
            dateFormat="dd-MM-yyy HH:mm"
            name="endTime"
            onKeyDown={(e) => e.preventDefault()}
            dropdownMode="select"
          />
        </Stack>
      ) : (
        <Text cursor={"crosshair"} onClick={() => setEditDate(!editDate)}>
          {getOutput(eventItem)}
        </Text>
      )}
    </>
  );
};