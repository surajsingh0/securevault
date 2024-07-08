import React, { useState, useContext } from "react";
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import LoadingOverlay from "./LoadingOverlay";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setIsLoggedIn } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });
            const accessToken = response.data.access_token;

            localStorage.setItem("token", accessToken);

            console.log("Login successful:", accessToken);

            setIsLoggedIn(true);

            navigate("/password-manager");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex align="center" justify="center" h="100vh">
            {loading && <LoadingOverlay isOpen={loading} />}
            <Box
                maxW="md"
                w="full"
                p={6}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6} size="xl" textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        mb={4}
                        placeholder="Username"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        mb={4}
                        type="password"
                        placeholder="Password"
                    />
                    <Button colorScheme="blue" type="submit" w="full">
                        Login
                    </Button>
                </form>
                <Text mt={4} textAlign="center">
                    Don't have an account?{" "}
                    <Link as={RouterLink} to="/register" color="blue.500">
                        Register
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default Login;
