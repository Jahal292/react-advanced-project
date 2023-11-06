import React from "react";
import { Box, Image, Center, Tooltip } from "@chakra-ui/react";

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FAF5E9",
  padding: "50px",
  zIndex: 1000,
  color: "#202721",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(180, 195, 157, 0.73)",
  zIndex: 1000,
};

export const PopUp = ({
  children,
  show,
  onClose,
  borderStyle,
  borderRad,
  height,
  showClose,
}) => {
  if (!show) return null;

  return (
    <>
      <Box style={overlayStyle} />
      <Center
        style={{ ...popupStyle, border: borderStyle }}
        borderRadius={borderRad}
        h={height}
      >
        {showClose && (
          <Tooltip label="Click to close the pop-up">
            <Image
              bg="brand.600"
              onClick={onClose}
              src="/src/assets/Cancel.png"
              h={"30px"}
              p={1}
              cursor={"pointer"}
              borderRadius={"50%"}
              _hover={{ backgroundColor: "brand.200" }}
              position="absolute"
              top="20px"
              right="40px"
            />
          </Tooltip>
        )}
        {children}
      </Center>
    </>
  );
};