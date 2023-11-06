import { useState, useEffect } from "react";
import { ACTIONS } from "../eventReducer";
import { useEvent } from "../EventContext";
import {
  Center,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export const EventEditSubItem_Title = ({ eventItem }) => {
  const { dispatch } = useEvent();
  const [editTitle, setEditTitle] = useState(eventItem);
  const [titleCheck, setTitleCheck] = useState(false);

  useEffect(() => {
    if (editTitle !== "" && editTitle !== eventItem) {
      setTitleCheck(editTitle.length <= 3);
      dispatch({ type: ACTIONS.EDIT_TITLE, payload: editTitle });
    }
  }, [editTitle, dispatch, eventItem]);

  useEffect(() => {
    dispatch({ type: ACTIONS.TITLE_CHECK, payload: titleCheck });
  }, [titleCheck, dispatch]);

  return (
    <Center>
      <Editable textAlign={"center"} color="black" defaultValue={eventItem}>
        <EditablePreview cursor={"crosshair"} minWidth={"150px"} />
        <EditableInput
          bg="brand.100"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          required
        />
      </Editable>
    </Center>
  );
};