import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import PageHero from "../components/PageHero";
import useCart from "../firebase/useCart";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const { handleCartUpdate } = useCart();
  useEffect(() => {
    handleCartUpdate().catch((err) => console.error(err));
  }, [items]);
  return (
    <Box>
      <PageHero page={"Cart"} />
      <Container maxW={"container.xl"} my={5}>
        {items.length > 0 && (
          <Button
            as={Link}
            to={"/shop-now"}
            size="sm"
            sx={{
              mt: 5,
              color: "var(--clr-white)",
              backgroundColor: "var(--clr-primary-5)",
              lineHeight: 1.25,
              letterSpacing: "var(--spacing)",
              textTransform: "capitalize",
              borderRadius: "var(--radius)",
              borderColor: "transparent",
              _hover: {
                color: "var(--clr-white)",
                backgroundColor: "var(--clr-primary-5)",
              },
            }}
          >
            Continue Shopping
          </Button>
        )}
        <Flex flexDirection={{ base: "column", md: "row" }} columnGap={5}>
          <Flex
            columnGap={10}
            flexDirection={{ base: "column" }}
            rowGap={5}
            mt={2}
            flex={4}
          >
            {items.length === 0 && (
              <>
                {" "}
                <Text
                  sx={{
                    letterSpacing: "var(--spacing)",
                    color: "var(--clr-grey-3)",
                    fontSize: "2rem",
                    textAlign: "center",
                  }}
                >
                  Your cart is empty.
                </Text>
                <Button
                  as={Link}
                  to={"/shop-now"}
                  size="sm"
                  sx={{
                    mt: 5,
                    color: "var(--clr-white)",
                    backgroundColor: "var(--clr-primary-5)",
                    lineHeight: 1.25,
                    letterSpacing: "var(--spacing)",
                    textTransform: "capitalize",
                    borderRadius: "var(--radius)",
                    borderColor: "transparent",
                    _hover: {
                      color: "var(--clr-white)",
                      backgroundColor: "var(--clr-primary-5)",
                    },
                  }}
                  width={"fit-content"}
                  marginX={"auto"}
                >
                  Shop now
                </Button>
              </>
            )}
            {items.map((product, index) => {
              return <CartItem cartItem={product} key={index} index={index} />;
            })}

            {/* Shipping */}
          </Flex>
          <CartTotal />
        </Flex>
      </Container>
    </Box>
  );
}

export default Cart;
