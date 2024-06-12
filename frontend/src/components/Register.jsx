import React, {useState} from "react";
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

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/register", { username, password });

            console.log("Registration successful:", response.data);

            navigate("/login");

        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <Flex align="center" justify="center" h="100vh">
            <Box
                maxW="md"
                w="full"
                p={6}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6} size="xl" textAlign="center">
                    Register
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={username}
                        mb={4}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        value={password}
                        mb={4}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button colorScheme="blue" type="submit" w="full">
                        Register
                    </Button>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account?{" "}
                    <Link as={RouterLink} to="/login" color="blue.500">
                        Login
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default Register;
