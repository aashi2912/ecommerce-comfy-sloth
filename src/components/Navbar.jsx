import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { auth } from "../firebase/config";
import { cartActions } from "../store/CartSlice";
function Navbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    dispatch(cartActions.DELETE_CART());
    navigate("/");
  };

  return (
    <Box backgroundColor={"var(--clr-grey-10)"}>
      <Container maxWidth={"container.xl"}>
        <Flex
          height="5rem"
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Link to={"/"}>
              <Image src={logo} alt="comfy-sloth" width={"175px"} />
            </Link>
          </Box>
          <Icon
            display={{ base: "block", md: "none" }}
            as={HamburgerIcon}
            boxSize={10}
            sx={{
              cursor: "pointer",
              color: "var(--clr-grey-1)",
              transition: "var(--transition)",
            }}
            onClick={onOpen}
          />
          <MobileNavbar
            isOpen={isOpen}
            onClose={onClose}
            handleSignOut={handleSignOut}
          />
          <Flex
            display={{ base: "none", md: "flex" }}
            sx={{
              color: "var(--clr-grey-3)",
              letterSpacing: "var(--spacing)",
              columnGap: 3,
              textTransform: "capitalize",
              justifyContent: "center",
            }}
          >
            <Link to={"/"} className="nav-links">
              Home
            </Link>
            <Link to={"/about"} className="nav-links">
              About
            </Link>
            <Link to={"/shop-now"} className="nav-links">
              Products
            </Link>
          </Flex>
          {user?.isLoggedIn ? (
            <Flex
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
              letterSpacing={"var(--spacing)"}
            >
              <Flex
                color={"var(--clr-grey-3)"}
                mr={2}
                justifyContent="center"
                alignItems="center"
                as={Link}
                to={"/cart"}
              >
                <Icon as={BsFillCartPlusFill} />
                <Text ml={1}>Cart</Text>
              </Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <FaUser />
                </MenuButton>
                <Text ml={2}>Welcome, {user?.name}</Text>
                <MenuList>
                  <MenuItem as={Link} to={"/profile"}>
                    Profile
                  </MenuItem>
                  <MenuItem as={Link} to={"/my-orders"}>
                    Orders
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Flex
              as={Link}
              to={"/sign-in"}
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
            >
              <Text fontSize="xl">Login</Text>
              <Icon as={FaUserPlus} boxSize={6} marginLeft={1} />
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

function MobileNavbar({ isOpen, onClose, handleSignOut }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const handleRoute = (value) => {
    // onClose();
    navigate(value);
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} closeOnEsc>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex
              sx={{
                color: "var(--clr-grey-3)",
                letterSpacing: "var(--spacing)",
                columnGap: 3,
                textTransform: "capitalize",
                flexDirection: "column",
                height: "full",
              }}
            >
              <Link to={"/"} onClick={onClose} className="nav-links">
                Home
              </Link>
              <Link to={"/about"} onClick={onClose} className={"nav-links"}>
                About
              </Link>
              <Link to={"/shop-now"} onClick={onClose} className={"nav-links"}>
                Products
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/cart" className="nav-links" onClick={onClose}>
                    Cart
                  </Link>
                  <Link to="/my-orders" className="nav-links" onClick={onClose}>
                    Orders
                  </Link>
                  <Link to="/profile" className="nav-links" onClick={onClose}>
                    Profile
                  </Link>
                  <Link
                    to={"/sign-out"}
                    className={"nav-links"}
                    style={{ marginTop: "auto" }}
                    onClick={handleSignOut}
                  >
                    <Icon as={FaUserMinus} marginRight={3} />
                    Log Out
                  </Link>
                </>
              ) : (
                <Link
                  to={"/sign-in"}
                  className={"nav-links"}
                  style={{ marginTop: "auto" }}
                  onClick={onClose}
                >
                  <Icon as={FaUserPlus} marginRight={3} />
                  Log In
                </Link>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
