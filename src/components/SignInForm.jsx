import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function SignInForm({ formik, loading, handleSSOLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const { values, touched, errors, handleChange, handleSubmit } = formik;
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      direction={"column"}
      justifyContent={"center"}
      rowGap={2}
      maxW={"sm"}
      flex={1}
    >
      <Text
        fontSize={"xx-large"}
        color="var(--clr-primary-1)"
        fontWeight={"400"}
        textAlign={"center"}
      >
        Sign In
      </Text>
      <FormControl
        id="email"
        isInvalid={Boolean(errors.email && touched.email)}
        color={"var(--clr-black)"}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email..."
          borderRadius={"var(--radius)"}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        isInvalid={Boolean(errors.password && touched.password)}
        color={"var(--clr-black)"}
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            placeholder="Enter password..."
            borderRadius={"var(--radius)"}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton
              size="sm"
              backgroundColor={"var(--clr-white)"}
              icon={showPassword ? <BiHide /> : <BiShow />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <Text
        fontSize={"sm"}
        as={Link}
        to={"/forgot-password"}
        color="var(--clr-grey-1)"
      >
        Forgot Password?
      </Text>
      <Button
        type="submit"
        isLoading={loading}
        width={"full"}
        variant="outline"
        spinnerPlacement="start"
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
      >
        Sign In
      </Button>
      <Divider />
      <Button
        type="button"
        colorScheme={"white"}
        leftIcon={<FcGoogle size="20" />}
        onClick={() => handleSSOLogin("GOOGLE")}
        sx={{
          textTransform: "capitalize",
          letterSpacing: "var(--spacing)",
          borderRadius: "var(--radius)",
          color: "var(--clr-primary-1)",
          fontSize: "1rem",
          fontWeight: "400",
          border: "1px solid var(--clr-primary-1)",
          transition: "var(--transition)",
        }}
      >
        Sign in with google
      </Button>
      <Text
        sx={{
          color: "var(--clr-grey-3)",
          textTransform: "capitalize",
        }}
      >
        Don't have an account?{" "}
        <Text as={Link} to="/sign-up" color="var(--clr-primary-3)">
          Sign-up
        </Text>{" "}
        here
      </Text>
    </Flex>
  );
}

export default SignInForm;
