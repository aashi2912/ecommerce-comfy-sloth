import {
  Button,
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
import { Link } from "react-router-dom";
function SignUpForm({ formik, loading }) {
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
        Sign Up
      </Text>
      <FormControl id="name" isInvalid={Boolean(errors.name && touched.name)}>
        <FormLabel htmlFor="name" color={"var(--clr-black)"}>
          Name
        </FormLabel>
        <Input
          name="name"
          type="text"
          value={values.name}
          placeholder="Enter name..."
          onChange={handleChange}
          borderRadius={"var(--radius)"}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
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
            placeholder="Enter password..."
            value={values.password}
            onChange={handleChange}
            borderRadius={"var(--radius)"}
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
      <FormControl
        id="confirmPassword"
        isInvalid={Boolean(errors.confirmPassword && touched.confirmPassword)}
        color={"var(--clr-black)"}
      >
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter confirm password..."
            value={values.confirmPassword}
            onChange={handleChange}
            borderRadius={"var(--radius)"}
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
        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
      </FormControl>
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
      >
        Sign Up
      </Button>
      <Text
        sx={{
          color: "var(--clr-grey-3)",
          textTransform: "capitalize",
        }}
      >
        Already have an account?{" "}
        <Text as={Link} to="/sign-in" color="var(--clr-primary-3)">
          Sign-in
        </Text>{" "}
        here
      </Text>
    </Flex>
  );
}

export default SignUpForm;
