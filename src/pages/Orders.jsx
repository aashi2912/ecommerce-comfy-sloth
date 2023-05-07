import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { firestore } from "../firebase/config";
import { formatPrice } from "../helper";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    if (uid) loadOrders();
  }, [uid]);

  function loadOrders() {
    setLoading(true);
    try {
      const collectionRef = collection(firestore, "orders");
      const q = query(
        collectionRef,
        where("uid", "==", uid),
        orderBy("createdOn", "desc")
      );
      getDocs(q).then((result) => {
        const tempOrders = [];
        result.docs.forEach((doc) => {
          let currDocument = { id: doc.id, ...doc.data() };
          tempOrders.push(currDocument);
        });
        setOrders([...tempOrders]);
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  if (loading || !uid) return <Loading />;

  return (
    <Box>
      <Container maxW={"container.xl"} w="full">
        {!loading && orders.length === 0 && (
          <>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={10}
            >
              <Heading textAlign={"center"}>
                You don't have any orders placed.
              </Heading>
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
                  width: "fit-content",
                  mx: "auto",
                }}
              >
                Shop Now
              </Button>
            </Flex>
          </>
        )}
        {orders.length > 0 && (
          <Text
            sx={{
              textAlign: "center",
              color: "var(--clr-grey-3)",
              letterSpacing: "var(--spacing)",
              fontWeight: "bold",
              marginTop: 5,
              fontSize: 24,
            }}
          >
            Orders
          </Text>
        )}
        {orders.map((order, index) => (
          <Box w="full" key={index} my={5}>
            <OrderItem orderItem={order} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

function OrderItem({ orderItem }) {
  const { line1, line2, city, state, country, postal_code } =
    orderItem.shippingAddress;
  return (
    <>
      <Flex
        flexDirection={"column"}
        rowGap={5}
        border="1px solid var(--clr-grey-9)"
        px={4}
        py={2}
        borderRadius="15px"
      >
        <Box
          sx={{
            fontSize: "1.1rem",
            color: "var(--clr-primary-1)",
          }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            fontSize={{ base: "smaller" }}
          >
            <HStack>
              <Text
                display={"inline"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                Order Id:
              </Text>
              <Text>{orderItem.id}</Text>
            </HStack>
            <HStack>
              <Text
                display={"inline"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                Order placed on:
              </Text>
              <Text>
                {new Timestamp(
                  orderItem.createdOn.seconds,
                  orderItem.createdOn.nanoseconds
                )
                  .toDate()
                  .toLocaleString()}
              </Text>
            </HStack>
            <HStack>
              <Text
                display={"inline"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                Delivery Status:
              </Text>
              <Text fontWeight={"normal"}>{orderItem.deliveryStatus}</Text>
            </HStack>
          </Stack>
        </Box>
        <Divider />
        <Box>
          {/* Order Items */}
          <Box>
            {orderItem.items.map((item, key) => {
              return (
                <>
                  <Flex key={key}>
                    <Image
                      src={item.image}
                      height={{ base: 50, md: 90 }}
                      width={{ base: 50, md: 100 }}
                    />
                    <Flex flexDir={"column"} ml={5}>
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
                          fontSize: "1rem",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        sx={{
                          color: "var(--clr-primary-5)",
                          fontWeight: 600,
                        }}
                      >
                        Price: <span>{formatPrice(item.price)}</span>
                      </Text>
                      <HStack fontSize={14}>
                        <Text
                          sx={{
                            color: "var(--clr-grey-5)",
                            letterSpacing: "var(--spacing)",
                            textTransform: "capitalize",
                          }}
                        >
                          Color:
                        </Text>
                        <Box
                          sx={{
                            backgroundColor: item.color,
                            height: 3,
                            width: 3,
                            borderRadius: "var(--radius)",
                          }}
                        />
                      </HStack>
                      <Text
                        sx={{
                          color: "var(--clr-grey-5)",
                          letterSpacing: "var(--spacing)",
                          textTransform: "capitalize",
                          fontSize: 14,
                        }}
                      >
                        Quantity: <span>{item.quantity}</span>
                      </Text>
                    </Flex>
                    <Text ml="auto">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Flex>
                </>
              );
            })}
          </Box>
          <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            flexDirection={{
              base: "column",
              md: "row",
            }}
          >
            {/* Address */}
            <Box>
              <Text
                sx={{
                  color: "var(--clr-primary-1)",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  letterSpacing: "var(--spacing)",
                }}
              >
                Shipping Address
              </Text>
              {line1 && `${line1}, `}
              {line2 && `${line2}, `}
              <br />
              {city && `${city}, `}
              {state && `${state}, `}
              {country && `${country}, `}
              {postal_code && `${postal_code}`}
            </Box>
            {/* Total */}
            <Box>
              <Text
                sx={{
                  color: "var(--clr-primary-1)",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  letterSpacing: "var(--spacing)",
                }}
              >
                Order Summary
              </Text>
              <SimpleGrid
                columns={2}
                sx={{
                  columnGap: 2,
                  color: "var(--clr-primary-1)",
                  textTransform: "capitalize",
                }}
              >
                <Text>Item(s) total: </Text>
                <Text>{formatPrice(orderItem.subTotal)}</Text>
                <Text>Shipping Charges: </Text>
                <Text>
                  {formatPrice(orderItem.totalAmount - orderItem.subTotal)}
                </Text>
                <Text fontWeight={"bold"}>Total: </Text>
                <Text fontWeight={"bold"}>
                  {formatPrice(orderItem.totalAmount)}
                </Text>
              </SimpleGrid>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Orders;
