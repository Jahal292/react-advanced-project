import React, { useState } from "react";
import { Tooltip, Image, Flex, Text } from "@chakra-ui/react";

export const Footer = ({ screenSize }) => {
  const [playMusic, setPlayMusic] = useState(true);
  const [sound, setSound] = useState(new Audio("/src/assets/MandaiSounds.mp3"));

  const toggleSound = () => {
    if (playMusic) {
      sound.play();
    } else {
      sound.pause();
      sound.currentTime = 0;
    }
    setPlayMusic(!playMusic);
    setSound(sound);
  };

  return (
    <Flex
      bg={"brand.500"}
      p={2}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text
        color={"brand.100"}
        fontSize={screenSize.width <= 700 && "xx-small"}
      >
        © 2023 JM Productions. All rights reserved{" "}
      </Text>
      <Tooltip
        label={
          playMusic
            ? "Press to turn the music on"
            : "Press to turn the music off"
        }
      >
        <Image
          onClick={toggleSound}
          src={playMusic ? "/src/assets/NoSound.png" : "/src/assets/Sound.png"}
          h={screenSize.width <= 700 ? "20px" : "30px"}
          bg="brand.100"
          borderRadius={"50%"}
          p={1}
          _hover={{ backgroundColor: "brand.300" }}
          boxShadow={"2xl"}
          position="absolute"
          right="20px"
          zIndex={1000}
        />
      </Tooltip>
    </Flex>
  );
};