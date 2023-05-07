import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AmountButtons from "../components/AmountButtons";
import Loading from "../components/Loading";
import PageHero from "../components/PageHero";
import ProductDescription from "../components/ProductDescription";
import ProductDescriptionImageGallery from "../components/ProductDescriptionImageGallery";
import { firestore } from "../firebase/config";
import useCart from "../firebase/useCart";
import { cartActions } from "../store/CartSlice";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDoc(doc(firestore, "products", id))
      .then((res) => {
        setProduct({ id: res.id, ...res.data() });
      })
      .catch(() => navigate("/shop-now"));
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    if (product != null) {
      setQuantity(1);
      setSelectedColor(product?.colors[0]);
      setSelectedImage(product?.images[0]);
    }
  }, [product]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  const isItemPresentInCart = items.find(
    (e) => e.pid === id && e.color === selectedColor
  );

  useEffect(() => {
    if (isItemPresentInCart) {
      setQuantity(isItemPresentInCart.quantity);
      setSelectedColor(isItemPresentInCart.color);
    } else {
      setQuantity(1);
    }
  }, [isItemPresentInCart]);
  const { handleCartUpdate } = useCart();
  useEffect(() => {
    handleCartUpdate().catch((err) => console.error(err));
  }, [items]);

  const handleAddProductInCart = async () => {
    if (isItemPresentInCart) {
      toast({
        status: "error",
        description: "Item already in cart.",
        isClosable: true,
        duration: 3000,
      });
      return;
    }
    if (!isLoggedIn) {
      navigate("/sign-in?return_url=/product/" + id);
      return;
    }
    let cartItem = {
      pid: id,
      name: product.name,
      color: selectedColor,
      price: product.price,
      image: product.images[0],
      quantity,
    };
    dispatch(cartActions.ADD_ITEM({ cartItem }));
    toast({
      status: "success",
      duration: 3000,
      description: "Item added to cart.",
      isClosable: true,
    });
  };

  if (product == null || loading) return <Loading />;
  return (
    <Box mb={20}>
      <PageHero page={"Products"} title={product?.name} />
      <Container maxW="container.xl" marginTop={10}>
        <Button
          as={Link}
          type="button"
          size="sm"
          to={"/shop-now"}
          sx={{
            textTransform: "capitalize",
            fontWeight: 400,
            boxShadow: "sm",
            padding: "1rem 1rem",
            letterSpacing: "var(--spacing)",
            borderRadius: "var(--radius)",
            transition: "var(--transition)",
            color: "var(--clr-primary-10)",
            backgroundColor: "var(--clr-primary-5)",
            borderColor: "transparent",
            lineHeight: 1.5,
            fontSize: "1rem",
            _hover: {
              color: "var(--clr-grey-1)",
              backgroundColor: "var(--clr-primary-7)",
            },
          }}
        >
          Back to Products
        </Button>
        <Flex
          mt={10}
          columnGap={20}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box w={{ base: "fit-content", md: "600px" }}>
            <Image
              src={selectedImage}
              alt={product.name}
              sx={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "var(--radius)",
                overflow: "clip",
                overflowClipMargin: "content-box",
              }}
            />
            <ProductDescriptionImageGallery
              product={product}
              setSelectedImage={setSelectedImage}
            />
          </Box>
          <Box>
            <ProductDescription
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <AmountButtons
              product={product}
              isItemPresentInCart={isItemPresentInCart}
              handleCartUpdate={handleCartUpdate}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedColor={selectedColor}
            />
            <Button
              type={"button"}
              onClick={handleAddProductInCart}
              isDisabled={Boolean(product.stock <= 0 || isItemPresentInCart)}
              isLoading={loading}
              sx={{
                marginTop: 5,
                backgroundColor: "var(--clr-primary-5)",
                borderColor: "transparent",
                borderRadius: "var(--radius)",
                color: "var(--clr-primary-10)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textTransform: "uppercase",
                transition: "var(--transition)",
                letterSpacing: "var(--spacing)",
                padding: "0.4rem 0.7rem",
                _hover: {
                  backgroundColor: "var(--clr-primary-7)",
                  color: "var(--clr-primary-1)",
                },
                _disabled: {
                  color: "var(--clr-primary-10)",
                  backgroundColor: "var(--clr-primary-5)",
                },
              }}
            >
              {isItemPresentInCart ? "Item already in cart" : "add to cart"}
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default ProductDetail;
