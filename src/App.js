import { Box } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { auth, firestore } from "./firebase/config";
import { loadCollections } from "./firebase/helpers";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { cartActions } from "./store/CartSlice";
import { productActions } from "./store/ProductSlice";
import { userActions } from "./store/UserSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.LOADING_PRODUCTS(true));
    loadCollections("products")
      .then((response) => {
        dispatch(productActions.SET_ALL_PRODUCTS({ products: response }));
      })
      .catch((err) => console.error(err));
    dispatch(productActions.LOADING_PRODUCTS(false));
  }, []);

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch(
          userActions.SET_USER({
            uid: user.uid,
            name: user.displayName
              ? user.displayName
              : user.email.split(0, -10),
            email: user.email,
            isEmailVerified: user.emailVerified,
            isLoggedIn: true,
          })
        );
        loadCart(user.uid).catch((err) => console.log(err));
      } else {
        sessionStorage.removeItem("user");
        dispatch(userActions.REMOVE_USER());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function loadCart(uid) {
    const collectionRef = collection(firestore, "cart");
    let q = query(collectionRef, where("user_id", "==", uid));
    let documents = await getDocs(q);
    let cart = {
      items: [],
      user_id: uid,
      createdOn: serverTimestamp(),
      lastModifiedOn: serverTimestamp(),
    };
    let cid = null;
    let items = [];
    if (documents.empty) {
      const result = await addDoc(collectionRef, cart);
      cid = result.id;
    } else {
      cid = documents.docs[0].id;
      items = documents.docs[0].data()?.items;
    }
    dispatch(cartActions.LOAD_CART({ items, cid }));
  }

  return (
    <>
      <Box className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/shop-now" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path={"/order-detail"}
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="my-orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
