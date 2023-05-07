import { Button, Container, Input, Text, useToast } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() =>
        toast({
          status: "success",
          description: "Please check your mail.",
        })
      )
      .catch((err) =>
        toast({
          status: "error",
          description: "Error while sending mail.please try again later.",
        })
      );
  };

  return (
    <>
      <Container maxW={"xs"} mt={5}>
        <Text
          fontSize={"xx-large"}
          color="var(--clr-primary-1)"
          fontWeight={"400"}
          textAlign={"center"}
        >
          Forgot Password
        </Text>
        <Input
          type={"email"}
          name="email"
          value={email}
          placeholder={"Enter Email."}
          onChange={(e) => setEmail(e.target.value)}
          my={3}
        />
        <Button
          type="submit"
          isLoading={loading}
          width={"full"}
          variant="outline"
          sx={{
            marginTop: 3,
            textTransform: "capitalize",
            letterSpacing: "var(--spacing)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--clr-primary-5)",
            color: "var(--clr-primary-10)",
            fontSize: "1.2rem",
            fontWeight: "600",
            border: "transparent",
            transition: "var(--transition)",
            _hover: {
              backgroundColor: "var(--clr-primary-7)",
              color: "var(--clr-black)",
            },
          }}
          onClick={handlePasswordReset}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}

export default ForgotPassword;
