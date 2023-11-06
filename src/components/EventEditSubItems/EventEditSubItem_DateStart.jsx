import { useState, useEffect } from "react";
import { useEvent } from "../EventContext";
import { ACTIONS } from "../eventReducer";
import { getTime } from "../getTime";
import { getDate } from "../getDate";
import DatePicker from "react-datepicker";
import "../../pages/react-datepicker.css";
import { Text } from "@chakra-ui/react";

export const EventEditSubItem_DateStart = ({ eventItem }) => {
  const { dispatch } = useEvent();
  const [editDate, setEditDate] = useState(false);
  const [newStart, setNewStart] = useState(new Date(eventItem));

  const getOutput = (eventItem) => {
    const output = (
      <span>
        {getDate(eventItem).props.children} -{" "}
        {getTime(eventItem).props.children}
      </span>
    );
    return output;
  };

  useEffect(() => {
    const editStart = newStart.toISOString();
    dispatch({ type: ACTIONS.EDIT_START, payload: editStart });
  }, [newStart, dispatch, eventItem]);

  return (
    <>
      {editDate ? (
        <DatePicker
          selectStart
          selected={newStart}
          onChange={(date) => setNewStart(date)}
          showTimeSelect
          dateFormat="dd-MM-yyy HH:mm"
          name="startTime"
          width="300px"
          className="custom-datepicker-input"
          onKeyDown={(e) => e.preventDefault()}
          dropdownMode="select"
        />
      ) : (
        <Text cursor={"crosshair"} onClick={() => setEditDate(!editDate)}>
          {getOutput(eventItem)}
        </Text>
      )}
    </>
  );
};