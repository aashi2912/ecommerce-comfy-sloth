import { Flex, Image } from "@chakra-ui/react";
import React from "react";

function ProductDescriptionImageGallery({ product, setSelectedImage }) {
  return (
    <Flex
      w={"inherit"}
      overflow="auto"
      justifyContent={"space-between"}
      mt={5}
      borderRadius={"var(--radius)"}
    >
      {product?.images?.map((image, index) => (
        <Image
          src={image}
          key={index}
          height={70}
          objectFit={"cover"}
          onClick={() => setSelectedImage(image)}
          mx={{ base: 2, md: 0 }}
        />
      ))}
    </Flex>
  );
}
export default ProductDescriptionImageGallery;
