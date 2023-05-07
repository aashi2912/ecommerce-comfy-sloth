import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../helper";
import ProductCard from "./ProductCard";

function FeaturedProducts({ products }) {
  return (
    <Box bgColor={"var(--clr-grey-10)"} py={10}>
      <Container maxW={"container.xl"}>
        <Text
          sx={{
            textAlign: "center",
            fontSize: "2.5rem",
            lineHeight: 1,
            textTransform: "capitalize",
            letterSpacing: "var(--spacing)",
          }}
        >
          Featured Products
        </Text>
        <Flex
          justifyContent={"center"}
          columnGap={10}
          direction={{ base: "column", md: "row" }}
          rowGap={5}
          marginTop={5}
        >
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </Flex>
        <HStack justifyContent={"center"} mt={5}>
          <Button
            as={Link}
            to={"/shop-now"}
            size="sm"
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
            All Products
          </Button>
        </HStack>
      </Container>
    </Box>
  );
}

function FeatureProduct({ product }) {
  const navigate = useNavigate();
  return (
    <Box minW={"300px"} onClick={() => navigate(`/product/${product.id}`)}>
      <Image
        src={product.images[0]}
        height={"225px"}
        width={"100%"}
        objectFit={"cover"}
        display="block"
        borderRadius={"var(--radius)"}
        transition={"var(--transition)"}
      />
      <HStack justifyContent={"space-between"} mt={1}>
        <Text
          sx={{
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.25,
            color: "var(--clr-grey-1)",
            letterSpacing: "var(--spacing)",
            textTransform: "capitalize",
          }}
        >
          {product.name}
        </Text>
        <Text
          sx={{
            color: "var(--clr-primary-5)",
            letterSpacing: "var(--spacing)",
          }}
        >
          {formatPrice(product.price)}
        </Text>
      </HStack>
    </Box>
  );
}

export default FeaturedProducts;
