import { Container, Flex, HStack, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebase/config";

function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  if (!user) return <Loading />;

  return (
    <Container maxW={"container.sm"}>
      <Flex justifyContent={"center"} flexDirection={"column"}>
        {user.photoURL && (
          <Image
            src={user.photoURL}
            borderRadius={"50%"}
            height={75}
            width={75}
          />
        )}
        <HStack w="full">
          <Text>Name:</Text>
          <Input
            type="text"
            size={"sm"}
            readOnly
            w={"full"}
            value={
              user.displayName
                ? user.displayName
                : user.displayName.slice(0, -10)
            }
          />
        </HStack>
        <HStack w="full">
          <Text>Email:</Text>
          <Input
            type={"email"}
            size="sm"
            readOnly
            value={user.email}
            w={"full"}
          />
        </HStack>
        <Flex w="full">
          <Text>Email Verified:</Text>
          <input type={"checkbox"} checked={user.emailVerified} />
        </Flex>
      </Flex>
    </Container>
  );
}

export default Profile;
