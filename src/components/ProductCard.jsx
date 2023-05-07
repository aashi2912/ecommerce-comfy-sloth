import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../helper";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Box maxW={"300px"} w="full">
      <Image
        loading="lazy"
        src={product?.images[0]}
        alt={product?.name}
        height={"175px"}
        display="block"
        width={"100%"}
        objectFit="cover"
        transition={"var(--transition)"}
        borderRadius={"var(--radius)"}
        cursor="pointer"
        _hover={{
          opacity: 0.5,
          transform: "scale(1.1)",
        }}
        onClick={() => navigate(`/product/${product?.id}`)}
      />

      <Flex
        marginTop={"1rem"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text
          sx={{
            color: "var(--clr-grey-1)",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "var(--spacing)",
            textTransform: "capitalize",
            lineHeight: "1.25",
          }}
        >
          {product?.name}
        </Text>
        <Text
          sx={{
            color: "var(--clr-primary-5)",
            letterSpacing: "var(--spacing)",
          }}
        >
          {formatPrice(product?.price)}
        </Text>
      </Flex>
    </Box>
  );
}

export default ProductCard;
