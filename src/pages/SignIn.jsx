import { Box, useToast } from "@chakra-ui/react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useFormik } from "formik";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loading from "../components/Loading";
import { auth } from "../firebase/config";

const SignInForm = lazy(() => import("../components/SignInForm"));

function SignIn() {
  const [loading, setLoading] = useState(false);
  const raiseToast = useToast();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { search } = useLocation();
  const [returnUrl, setReturnUrl] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(search);
    if (query.has("return_url")) {
      setReturnUrl(query.get("return_url"));
    }
  }, [search]);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/shop-now");
    }
  }, [isLoggedIn]);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid Email"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await handleLogin(values);
    },
  });
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      if (returnUrl) navigate(returnUrl);
      else navigate("/shop-now");
      raiseToast({
        status: "success",
        description: "Login successful.",
      });
    } catch (error) {
      console.error(error.message);
      raiseToast({
        status: "error",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSSOLogin = async (type) => {
    try {
      let provider = null;
      switch (type) {
        case "GOOGLE": {
          provider = new GoogleAuthProvider();
          provider.addScope("profile");
          provider.addScope("email");
          provider.setCustomParameters({ login_hint: "Comfy Sloth" });
          break;
        }
        default:
          return;
      }
      await signInWithPopup(auth, provider);
      if (returnUrl) navigate(returnUrl);
      else navigate("/shop-now");
      raiseToast({
        status: "success",
        description: "Login successful.",
      });
    } catch (error) {
      console.error(error);
      raiseToast({
        status: "error",
        description: "Error while login.",
      });
    }
  };

  return (
    <Box
      maxW={"full"}
      sx={{
        padding: 5,
        borderRadius: "var(--radius)",
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<Loading />}>
        <SignInForm
          formik={formik}
          loading={loading}
          handleSSOLogin={handleSSOLogin}
        />
      </Suspense>
    </Box>
  );
}

export default SignIn;
