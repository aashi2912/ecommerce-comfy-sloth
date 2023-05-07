import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"full"} w={"full"}>
      <Spinner
        size="xl"
        color="var(--clr-primary-1)"
        thickness={2}
        speed={"0.65s"}
      />
    </Flex>
  );
}

export default Loading;
