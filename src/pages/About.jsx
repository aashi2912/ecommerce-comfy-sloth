import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import PageHero from "../components/PageHero";

function About() {
  return (
    <Box>
      <PageHero page={"About"} />
      <Container maxW={"container.xl"}>
        <Flex
          marginY={50}
          columnGap={50}
          direction={{ base: "column", md: "row" }}
        >
          <Image
            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
            alt="Comfy Sloth"
            sx={{
              width: "100%",
              height: "500px",
              borderRadius: "var(--radius)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box>
            <Text
              sx={{
                fontSize: "2.5rem",
                textTransform: "capitalize",
                color: "var(--clr-grey-1)",
                lineHeight: 1.5,
                fontWeight: "bold",
                letterSpacing: "var(--spacing)",
              }}
            >
              Our Story
            </Text>
            <Text
              sx={{
                width: "6rem",
                border: "2px solid var(--clr-primary-5)",
              }}
            ></Text>
            <Text
              sx={{
                marginTop: 5,
                fontSize: "1rem",
                lineHeight: 2,
                color: "var(--clr-grey-5)",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              praesentium beatae, quis soluta eum provident itaque laborum
              veniam alias nesciunt autem commodi fugiat fuga quos ipsum
              consequuntur maxime. Saepe, delectus.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default About;
