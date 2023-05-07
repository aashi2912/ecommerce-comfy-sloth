import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { formatPrice } from "../helper";

function ProductDescription({ product, selectedColor, setSelectedColor }) {
  return (
    <>
      <Heading
        sx={{
          lineHeight: 1,
          fontSize: "2.5rem",
          textTransform: "capitalize",
          color: "var(--clr-grey-1)",
          letterSpacing: "var(--spacing)",
          marginBottom: "0.75rem",
        }}
      >
        {product.name}
      </Heading>
      <Text
        sx={{
          fontSize: "1.25rem",
          lineHeight: 1.25,
          fontWeight: "bold",
          marginBottom: "0.75rem",
          letterSpacing: "var(--spacing)",
          color: "var(--clr-primary-5)",
        }}
      >
        {formatPrice(product.price)}
      </Text>
      <Text
        sx={{
          lineHeight: 2,
          maxW: "45em",
          color: "var(--clr-grey-3)",
          marginBottom: "1.25rem",
        }}
      >
        {product.description}
      </Text>
      <Flex
        sx={{
          flexDir: "column",
          rowGap: 2,
          color: "var(--clr-grey-3)",
          fontSize: "1rem",
          marginBottom: 5,
        }}
      >
        <HStack>
          <Text fontWeight={700} w={100}>
            Available:
          </Text>
          <Text textTransform={"capitalize"}>
            {product.stock > 0 ? "In Stock" : "Out Of Stock"}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight={700} w={100}>
            SKU:
          </Text>
          <Text>{product.id}</Text>
        </HStack>
        <HStack>
          <Text fontWeight={700} w={100}>
            Brand:
          </Text>
          <Text textTransform={"capitalize"}>{product.company}</Text>
        </HStack>
      </Flex>
      <Divider />
      <HStack mt={5}>
        <Text fontWeight={700} w={100}>
          Color:
        </Text>
        <Box>
          {product.colors.map((color, index) => (
            <Button
              key={index}
              type="button"
              sx={{
                height: "1.5rem",
                width: "1.5rem",
                marginRight: "0.5rem",
                backgroundColor: color,
                _hover: {
                  backgroundColor: color,
                },
              }}
              onClick={() => setSelectedColor(product.colors[index])}
            >
              {color === selectedColor && <CheckIcon color={"white"} />}
            </Button>
          ))}
        </Box>
      </HStack>
    </>
  );
}

export default ProductDescription;
