import { Flex, useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useFormik } from "formik";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loading from "../components/Loading";
import { auth } from "../firebase/config";

const SignUpForm = lazy(() => import("../components/SignUpForm"));

function SignUp() {
  const [loading, setLoading] = useState(false);
  const raiseToast = useToast();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/shop-now");
    }
  }, [isLoggedIn]);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is Required")
      .matches(/^[a-zA-Z ]+$/, "Should Only contain Alphabets and space"),
    email: yup.string().required("Email is Required").email("Invalid Email"),
    password: yup.string().required("Password is Required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf(
        [yup.ref("password")],
        "Confirm Password and Password are not same"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await handleRegister(values);
    },
  });

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password
      );
      console.log(values);
      await updateProfile(userCredential.user, { displayName: values?.name });
      await sendEmailVerification(userCredential.user);
      navigate("/shop-now");
    } catch (error) {
      raiseToast({
        status: "error",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        maxW={"full"}
        sx={{
          padding: 5,
          borderRadius: "var(--radius)",
          marginTop: 2,
        }}
      >
        <Suspense fallback={<Loading />}>
          <SignUpForm formik={formik} loading={loading} />
        </Suspense>
      </Flex>
    </>
  );
}

export default SignUp;
