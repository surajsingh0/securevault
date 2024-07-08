import React, { useState, useEffect, createContext } from "react";
import {
    ChakraProvider,
    Box,
    Flex,
    Link,
    Button,
    Heading,
    useColorModeValue,
    Container,
    VStack,
    HStack,
    useDisclosure,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link as RouterLink,
} from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PasswordManager from "./components/PasswordManager";

export const AuthContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const NavLink = ({ to, children }) => (
        <Link
            as={RouterLink}
            to={to}
            px={2}
            py={1}
            rounded="md"
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
            }}
        >
            {children}
        </Link>
    );

    // const [scrolled, setScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 50) {
    //             setScrolled(true);
    //         } else {
    //             setScrolled(false);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    const NavBar = () => (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            // transition="all 0.3s ease-in-out"
            // padding={scrolled ? "1rem" : "1.5rem"}
            padding="1rem"
            bg={bgColor}
            color={textColor}
            boxShadow="sm"
            position="sticky"
            top="0"
            zIndex="999"
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing="tight">
                    <RouterLink to="/">SecureVault</RouterLink>
                </Heading>
            </Flex>

            <HStack spacing={8} alignItems="center">
                <HStack
                    as="nav"
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                >
                    {/* <NavLink to="/">Home</NavLink> */}
                </HStack>
            </HStack>

            <HStack>
                {isLoggedIn && (
                    <NavLink to="/password-manager">Password Manager</NavLink>
                )}
                {isLoggedIn ? (
                    <Button colorScheme="blue" onClick={signOut}>
                        Sign Out
                    </Button>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <Button
                            as={RouterLink}
                            to="/register"
                            colorScheme="blue"
                        >
                            Register
                        </Button>
                    </>
                )}
                <IconButton
                    size="md"
                    icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={onOpen}
                />
            </HStack>
        </Flex>
    );

    return (
        <ChakraProvider>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <Router>
                    <Box
                        minH="100vh"
                        bg={useColorModeValue("gray.50", "gray.900")}
                    >
                        <NavBar />
                        <Container maxW="full" p={0}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        isLoggedIn ? (
                                            <PasswordManager />
                                        ) : (
                                            <Home />
                                        )
                                    }
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/password-manager"
                                    element={
                                        isLoggedIn ? (
                                            <PasswordManager />
                                        ) : (
                                            <Login />
                                        )
                                    }
                                />
                            </Routes>
                        </Container>
                    </Box>
                </Router>
            </AuthContext.Provider>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            <NavLink to="/" onClick={onClose}>
                                Home
                            </NavLink>
                            {isLoggedIn && (
                                <NavLink
                                    to="/password-manager"
                                    onClick={onClose}
                                >
                                    Password Manager
                                </NavLink>
                            )}
                            {isLoggedIn ? (
                                <Button
                                    colorScheme="blue"
                                    onClick={() => {
                                        signOut();
                                        onClose();
                                    }}
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <>
                                    <NavLink to="/login" onClick={onClose}>
                                        Login
                                    </NavLink>
                                    <Button
                                        as={RouterLink}
                                        to="/register"
                                        colorScheme="blue"
                                        onClick={onClose}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    );
}

export default App;
