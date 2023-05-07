import { Box, Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase/config";
import { formatPrice } from "../helper";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function CartTotal() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const { items, cid } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      setTotalAmount(0);
      setShippingCharges(0);
      return;
    }
    let total = 0;
    items.forEach((i) => {
      total += i.price * i.quantity;
    });
    let charges = 15 * 100;
    setTotalAmount(total);
    setShippingCharges(charges);
  }, [items]);
  const { email, uid } = useSelector((state) => state.user);
  const checkout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post("/.netlify/functions/create-checkout", {
        email,
        uid,
        cid,
        shippingCharges,
        items,
      });
      console.log("Data: ", data);
      console.log("Cid: ", cid);
      await updateDoc(doc(firestore, "cart", cid), {
        sessionId: data?.id,
      });
      stripe
        .redirectToCheckout({ sessionId: data?.id })
        .then((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Flex flex={2} flexDirection="column" mt={5}>
        <Box
          sx={{
            border: "1px solid var(--clr-grey-8)",
            borderRadius: "var(--radius)",
            paddingY: 8,
            paddingLeft: 8,
          }}
        >
          <SimpleGrid
            columns={2}
            sx={{
              fontSize: "1rem",
              lineHeight: 1.5,
              letterSpacing: "var(--spacing)",
              marginBottom: "0.75rem",
              color: "var(--clr-grey-1)",
            }}
          >
            <Text fontWeight={"bold"}>Subtotal:</Text>
            <Text fontWeight={"bold"}>{formatPrice(totalAmount)}</Text>
            <Text>Shipping Fee:</Text>
            <Text>{formatPrice(shippingCharges)}</Text>
          </SimpleGrid>
          <Divider />
          <SimpleGrid
            columns={2}
            sx={{
              fontSize: "1.5rem",
              lineHeight: 1,
              letterSpacing: "var(--spacing)",
              marginBottom: "0.75rem",
              color: "var(--clr-grey-1)",
              mt: 5,
            }}
          >
            <Text fontWeight={"bold"}>Order Total:</Text>
            <Text fontWeight={"bold"}>
              {formatPrice(shippingCharges + totalAmount)}
            </Text>
          </SimpleGrid>
        </Box>
        <Button
          type="button"
          onClick={checkout}
          isLoading={loading}
          isDisabled={totalAmount === 0}
          sx={{
            marginTop: 5,
            textAlign: "center",
            fontWeight: 700,
            color: "var(--clr-primary-10)",
            backgroundColor: "var(--clr-primary-5)",
            borderColor: "transparent",
            borderRadius: "var(--radius)",
            letterSpacing: "var(--spacing)",
            fontSize: "1rem",
            padding: "0.35rem 0.75rem",
            transition: "var(--transition)",
            _hover: {
              backgroundColor: "var(--clr-primary-7)",
              color: "var(--clr-primary-1)",
            },
          }}
        >
          Proceed to checkout
        </Button>
      </Flex>
    </>
  );
}
