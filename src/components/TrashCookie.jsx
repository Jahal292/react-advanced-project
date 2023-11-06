import React, { useState, useEffect } from "react";
import { getImageSize } from "react-image-size";
import { Box, Image, Center } from "@chakra-ui/react";
import "./trashCookie.css";

export const TrashCookie = ({ screenSize }) => {
  const [yValue, setYValue] = useState();
  const [imageHeight, setImageHeight] = useState(null);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(180, 195, 157, 0.73)",
    zIndex: 1000,
  };

  useEffect(() => {
    getImageSize("/src/assets/TrashCan.png")
      .then((size) => {
      setImageHeight(size.height);
      })
      .catch((error) => {
        console.error(
          "Error when catching the measurements form the image:",
          error
        );
      });
  });

  useEffect(() => {
    setYValue(screenSize.height - imageHeight - 120);
  }, [screenSize, imageHeight]);

  return (
    <Box className="Nocookie-container" style={overlayStyle}>
      <div
        className="NoCookie"
        style={{
          left: "45%",
        }}
      ></div>
      <Center>
        <Image
          mt={"20%"}
          src="/src/assets/TrashCan.png"
          zIndex={1000}
          transform={screenSize.width <= 700 && `translate(25px, ${yValue}px)`}
        />
      </Center>
    </Box>
  );
};