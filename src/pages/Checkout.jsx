import { Button, Container, Flex, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { firestore } from "../firebase/config";
import { cartActions } from "../store/CartSlice";

export default function Checkout() {
  const toast = useToast();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [cid, setCid] = useState(null);
  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = new URLSearchParams(search);
    if (query.has("cid")) {
      setCid(query.get("cid"));
    }
    if (query.has("status")) {
      setStatus(query.get("status"));
    }
  }, [search]);

  useEffect(() => {
    setLoading(true);
    if (cid && status.toLowerCase() === "success") {
      addOrder()
        .then(() => {
          setSuccess(true);
          toast({
            status: "success",
            description: "Order placed successfully",
            duration: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
          toast({
            status: "error",
            description: "Error while placing the order.",
            duration: 3000,
            isClosable: true,
          });
        });
    } else if (cid && status.toLowerCase() === "cancel") {
      setSuccess(false);
      toast({
        status: "error",
        description: "You cancel the payment",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  }, [cid, search]);

  if (loading || success === null) return <Loading />;

  async function addOrder() {
    const docRef = await doc(firestore, "cart", cid);

    const cart = (await getDoc(docRef)).data();

    // create order
    const { data } = await axios.post("/.netlify/functions/retrieve-checkout", {
      sessionId: cart.sessionId,
    });
    const shipping = data.result.shipping_details;
    const result = await addDoc(collection(firestore, "orders"), {
      uid: cart.user_id,
      items: cart.items,
      shippingAddress: shipping.address,
      deliveryStatus: "Order Placed",
      totalAmount: data.result.amount_total,
      subTotal: data.result.amount_subtotal,
      createdOn: serverTimestamp(),
      lastModifiedOn: serverTimestamp(),
    });
    await deleteDoc(docRef);
    // delete items in cid
    dispatch(cartActions.DELETE_CART());
    return result.id;
  }

  return (
    <>
      <Container maxW={"container.xl"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection="column"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <Heading
                sx={{
                  marginTop: 20,
                  letterSpacing: "var(--spacing)",
                  color: "var(--clr-grey-3)",
                }}
              >
                {!loading && success
                  ? "Your order has been placed successfully"
                  : "Error occurred while placing order."}
              </Heading>
              <Button
                as={Link}
                to={"/shop-now"}
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
                Continue Shopping
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
}
