import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiShield, FiKey, FiLock } from "react-icons/fi";
import { FaFingerprint } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }) => (
    <VStack
        bg={useColorModeValue("white", "gray.700")}
        p={6}
        rounded="lg"
        shadow="md"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
    >
        <Icon size={48} color={useColorModeValue("blue.500", "blue.300")} />
        <Heading as="h3" size="md" mb={2}>
            {title}
        </Heading>
        <Text
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.400")}
        >
            {description}
        </Text>
    </VStack>
);

const Home = () => {
    const bgGradient = useColorModeValue(
        "linear(to-br, blue.100, purple.100)",
        "linear(to-br, blue.900, purple.900)"
    );

    return (
        <Box minH="100vh" bgGradient={bgGradient} py={12}>
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack textAlign="center" spacing={5}>
                        <Heading
                            as="h1"
                            size="4xl"
                            bgGradient="linear(to-r, blue.400, purple.500)"
                            bgClip="text"
                        >
                            SecureVault
                        </Heading>
                        <Text
                            fontSize={{ base: "xl", md: "2xl" }}
                            maxW="3xl"
                            color={useColorModeValue("gray.600", "gray.300")}
                        >
                            Your ultimate password manager. Protect your digital
                            life with military-grade encryption and intuitive
                            features.
                        </Text>
                        <Flex
                            mt={8}
                            flexDir={{ base: "column", sm: "row" }}
                            justifyContent="center"
                            w="full"
                        >
                            <Button
                                as={RouterLink}
                                to="/register"
                                colorScheme="blue"
                                size="lg"
                                mb={{ base: 4, sm: 0 }}
                                mr={{ sm: 4 }}
                            >
                                Get Started
                            </Button>
                            <Button
                                as={RouterLink}
                                to="/login"
                                colorScheme="purple"
                                variant="outline"
                                size="lg"
                            >
                                Login
                            </Button>
                        </Flex>
                    </VStack>

                    <VStack spacing={12}>
                        <Heading as="h2" size="2xl" textAlign="center">
                            Why Choose SecureVault?
                        </Heading>
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(4, 1fr)",
                            }}
                            gap={8}
                        >
                            <FeatureCard
                                icon={FiShield}
                                title="Unbreakable Security"
                                description="State-of-the-art encryption keeps your passwords safe from prying eyes."
                            />
                            <FeatureCard
                                icon={FiKey}
                                title="Password Generator"
                                description="Create strong, unique passwords with our built-in generator."
                            />
                            <FeatureCard
                                icon={FiLock}
                                title="Auto-Fill"
                                description="Seamlessly fill in your login details across all your devices."
                            />
                            <FeatureCard
                                icon={FaFingerprint}
                                title="Biometric Access"
                                description="Quickly access your vault using fingerprint or face recognition."
                            />
                        </Grid>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default Home;
