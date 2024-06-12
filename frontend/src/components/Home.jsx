import React from "react";
import { Box, Heading, Text, Button, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="xl" mb={4}>
                Welcome to My App
            </Heading>
            <Text fontSize="lg" mb={6}>
                Password Manager
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sapiente labore, dicta esse, neque cumque saepe harum voluptates accusantium laborum repellendus tenetur iusto natus ratione quo dolore ullam atque? Minima?
            </Text>
            <Flex justify="center" mb={6}>
                <Image
                    src="https://via.placeholder.com/400"
                    alt="App illustration"
                    borderRadius="md"
                    shadow="md"
                />
            </Flex>
            <Button
                as={RouterLink}
                to="/register"
                colorScheme="blue"
                size="lg"
                mr={4}
            >
                Get Started
            </Button>
            <Button
                as={RouterLink}
                to="/login"
                colorScheme="teal"
                size="lg"
            >
                Login
            </Button>
        </Box>
    );
};

export default Home;
