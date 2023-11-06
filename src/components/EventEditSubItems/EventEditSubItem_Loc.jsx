import { useState, useEffect } from "react";
import { ACTIONS } from "../eventReducer";
import { useEvent } from "../EventContext";
import { EditableInput, EditablePreview } from "@chakra-ui/react";

export const EventEditSubItem_Loc = ({ eventItem, width }) => {
  const { dispatch } = useEvent();
  const [editLocation, setEditLocation] = useState(eventItem);
  const [locCheck, setLocCheck] = useState(false);

  useEffect(() => {
    if (editLocation !== "" && editLocation !== eventItem) {
      setLocCheck(editLocation.length <= 3);
      dispatch({ type: ACTIONS.EDIT_LOC, payload: editLocation });
    }
  }, [editLocation, dispatch, eventItem]);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOC_CHECK, payload: locCheck });
  }, [locCheck, dispatch]);

  return (
    <>
      <EditablePreview cursor={"crosshair"} minWidth={"100px"} width={width} />
      <EditableInput
        bg="brand.100"
        value={editLocation}
        onChange={(e) => setEditLocation(e.target.value)}
      />
    </>
  );
};