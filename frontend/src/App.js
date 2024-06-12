import React, { useState, createContext } from "react";
import { ChakraProvider, Box, Flex, Link } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link as RouterLink,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PasswordManager from "./components/PasswordManager";
import { useEffect } from "react";

const AuthContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <ChakraProvider>
                <Router>
                    <Box bg="blue.500" color="white" p={4}>
                        <Flex justify="space-between" maxW="1200px" mx="auto">
                            <Box>
                                <Link
                                    as={RouterLink}
                                    to="/"
                                    mr={4}
                                    _hover={{ color: "blue.300" }}
                                >
                                    My App
                                </Link>
                            </Box>
                            <Flex>
                                <Link
                                    as={RouterLink}
                                    to="/password_manager"
                                    _hover={{ color: "blue.300" }}
                                >
                                    Password Manager
                                </Link>
                                <Link
                                    as={RouterLink}
                                    to={isLoggedIn ? "/" : "/register"}
                                    _hover={{ color: "blue.300" }}
                                    onClick={signOut}
                                    ml={4}
                                >
                                    {isLoggedIn ? "Sign Out" : "Register"}
                                </Link>
                            </Flex>
                        </Flex>
                    </Box>

                    <Box p={4} maxW="1200px" mx="auto">
                        <Routes>
                            <Route path="/" element={isLoggedIn ? <PasswordManager/> : <Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/password_manager"
                                element={
                                    isLoggedIn ? <PasswordManager /> : <Login />
                                }
                            />
                        </Routes>
                    </Box>
                </Router>
            </ChakraProvider>
        </AuthContext.Provider>
    );
}

export { AuthContext };
export default App;
