import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartSlice";

function AmountButtons({
  product,
  isItemPresentInCart,
  handleCartUpdate,
  quantity,
  setQuantity,
  selectedColor,
}) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    handleCartUpdate(items).catch((err) => console.log(err));
  }, [items]);
  const handleIncrementQuantity = async () => {
    if (quantity === product.stock) return;
    if (!isLoggedIn || !isItemPresentInCart)
      setQuantity((prevState) =>
        prevState < product.stock ? prevState + 1 : prevState
      );
    else {
      dispatch(
        cartActions.INCREASE_QUANTITY({
          pid: product.id,
          color: selectedColor,
          stock: product.stock,
        })
      );
    }
  };

  const handleDecrementQuantity = async () => {
    if (quantity === 1) return;
    if (!isLoggedIn || !isItemPresentInCart) {
      setQuantity((prevState) => (prevState > 1 ? prevState - 1 : 1));
    } else {
      dispatch(
        cartActions.DECREASE_QUANTITY({ pid: product.id, color: selectedColor })
      );
    }
  };

  return (
    <HStack columnGap={5} mt={5}>
      <Box disabled={quantity === 1}>
        <MinusIcon
          role="button"
          fontSize="1.1rem"
          onClick={handleDecrementQuantity}
        />
      </Box>

      <Text
        sx={{
          lineHeight: 1,
          fontSize: "2.5rem",
        }}
      >
        {isItemPresentInCart ? isItemPresentInCart.quantity : quantity}
      </Text>
      <AddIcon
        role="button"
        fontSize="1.1rem"
        onClick={handleIncrementQuantity}
      />
    </HStack>
  );
}

export default AmountButtons;
