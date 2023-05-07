import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import useCart from "../firebase/useCart";
import { formatPrice } from "../helper";
import { cartActions } from "../store/CartSlice";

export default function CartItem({ cartItem, index }) {
  const dispatch = useDispatch();
  const { handleCartUpdate } = useCart();
  const { all_products } = useSelector((state) => state.product);
  const product = all_products.find(
    (a) => a.id === cartItem.pid && a.colors.includes(cartItem.color)
  );

  const handleIncrementQuantity = async () => {
    if (cartItem.quantity === product.stock) return;
    dispatch(
      cartActions.INCREASE_QUANTITY({
        pid: cartItem.pid,
        color: cartItem.color,
        stock: product.stock,
      })
    );
  };

  const handleDecrementQuantity = async () => {
    if (cartItem.quantity === 1) return;
    dispatch(
      cartActions.DECREASE_QUANTITY({
        pid: cartItem.pid,
        color: cartItem.color,
      })
    );
  };

  const handleRemoveItem = async () => {
    dispatch(
      cartActions.REMOVE_ITEM({ pid: cartItem.pid, color: cartItem.color })
    );
    await handleCartUpdate();
  };
  return (
    <>
      <VStack key={index} flex={4} w="full" h="full">
        <HStack w="full" justifyContent={"flex-start"} py={3} px={3}>
          <Image
            src={cartItem.image}
            height={{ base: 50, md: 125 }}
            width={{ base: 125 }}
            objectFit={"cover"}
            borderRadius={"var(--radius)"}
          />
          <Flex flexDir={"column"}>
            <Text
              as={"h5"}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                color: "var(--clr-primary-1)",
                lineHeight: 1.25,
                letterSpacing: "var(--spacing)",
                mb: 0,
                pb: 0,
                fontSize: "1.2rem",
              }}
            >
              {product.name}
            </Text>
            <Text
              sx={{
                color: "var(--clr-primary-5)",
                fontWeight: 600,
              }}
            >
              Price: <span>{formatPrice(product.price)}</span>
            </Text>
            <HStack>
              <Text
                sx={{
                  color: "var(--clr-grey-5)",
                  letterSpacing: "var(--spacing)",
                  textTransform: "capitalize",
                  mt: 0,
                  pt: 0,
                  display: "inline",
                }}
              >
                Color:
              </Text>
              <Box
                sx={{
                  backgroundColor: cartItem.color,
                  height: 3,
                  width: 3,
                  borderRadius: "var(--radius)",
                }}
              />
            </HStack>
            <HStack>
              <IconButton
                variant={"outline"}
                size={"sm"}
                onClick={handleDecrementQuantity}
                sx={{
                  borderRadius: "50%",
                }}
              >
                <MinusIcon />
              </IconButton>
              <Text>{cartItem.quantity}</Text>
              <IconButton
                variant={"outline"}
                size={"sm"}
                onClick={handleIncrementQuantity}
                sx={{
                  borderRadius: "50%",
                }}
              >
                <AddIcon />
              </IconButton>
            </HStack>
          </Flex>
          <Flex
            flex={1}
            justifyContent={{ base: "space-around", md: "center" }}
            alignItems={{ base: "space-around", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <IconButton
              ml="auto"
              size="sm"
              sx={{
                color: "var(--clr-white)",
                backgroundColor: "var(--clr-red-dark)",
              }}
              onClick={handleRemoveItem}
            >
              <DeleteIcon />
            </IconButton>
          </Flex>
        </HStack>
      </VStack>
    </>
  );
}
