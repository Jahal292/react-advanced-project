import { validateImage } from "./validateImage";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEvent } from "./EventContext";
import { ACTIONS } from "./eventReducer";

export const ValidationInput = ({ input }) => {
  const { dispatch } = useEvent();
  const [saveToggle, setSaveToggle] = useState(true);

  useEffect(() => {
    if (!validateImage(input)) {
      setSaveToggle(false);
    } else {
      setSaveToggle(true);
    }
    dispatch({ type: ACTIONS.SHOW_SAVE, payload: saveToggle });
  }, [saveToggle, dispatch, input]);

  return (
    !validateImage(input) && (
      <Text color="darkred" fontSize={"md"} fontWeight={"semibold"}>
        This is NOT a valid image url.
      </Text>
    )
  );
};