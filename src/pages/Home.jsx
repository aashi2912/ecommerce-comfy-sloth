import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/hero-bcg-2.jpeg";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  const state = useSelector((state) => state.product);
  return (
    <>
      <Box paddingY={50}>
        <Container maxW={"container.xl"}>
          <Flex direction={"row"} justifyContent={"space-around"}>
            <Box maxW={{ base: "100%" }}>
              <Heading
                sx={{
                  fontSize: "3rem",
                  marginBottom: "2rem",
                  lineHeight: 1,
                  letterSpacing: "var(--spacing)",
                  textTransform: "capitalize",
                  color: "var(--clr-grey-1)",
                }}
              >
                Design Your Comfort Zone
              </Heading>
              <Text
                sx={{
                  color: "var(--clr-grey-5)",
                  lineHeight: 2,
                  maxW: "45em",
                  mb: "2rem",
                  fontSize: "1.25rem",
                }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ducimus quibusdam vel quia quisquam repellat quos, qui nihil
                error obcaecati ea aliquam cumque fuga expedita recusandae, ex
                unde quod aut sequi.
              </Text>
              <Button
                w="fit-content"
                as={Link}
                to={"/shop-now"}
                sx={{
                  textTransform: "capitalize",
                  letterSpacing: "var(--spacing)",
                  borderRadius: "var(--radius)",
                  transition: "var(--transition)",
                  color: "var(--clr-primary-10)",
                  bgColor: "var(--clr-primary-5)",
                  borderColor: "transparent",
                  fontWeight: 400,
                  fontSize: "1rem",
                  textAlign: "center",
                  _hover: {
                    color: "var(--clr-primary-1)",
                    bgColor: "var(--clr-primary-7)",
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
            <Box display={{ base: "none", md: "block" }}>
              <Image src={logo} height={"100%"} width="500px" />
            </Box>
          </Flex>
        </Container>
      </Box>
      {state.all_products.length > 0 && (
        <FeaturedProducts products={state.all_products.slice(0, 3)} />
      )}
    </>
  );
}

export default Home;
