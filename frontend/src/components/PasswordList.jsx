import React, { useEffect, useState } from "react";
import { Box, HStack, List, ListItem, Text, Button, useDisclosure } from "@chakra-ui/react";
import PasswordStrength from "./PasswordStrength";
import ReusedPasswordModal from "./ReusedPasswordModal";

const PasswordList = ({
    passwords,
    handlePasswordClick,
    handleDeletePassword,

    setSelectedPassword,
    isPasswordOpen,
    onPasswordOpen,
    onPasswordClose,
    handleUpdatePassword,
}) => {
    const [isReusedPasswords, setIsReusedPasswords] = useState({});

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filteredPasswords, setFilteredPasswords] = useState([]);

    const [currentReusedPasswords, setCurrentReusedPasswords] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const checkReusedPasswords = () => {
        const passwordMap = {};
        for (const password of passwords) {
            if (passwordMap[password.password]) {
                passwordMap[password.password][1].push(password);
                passwordMap[password.password][0] += 1;
            } else {
                passwordMap[password.password] = { 0: 0, 1: [password] };
                passwordMap[password.password][0] = 1;
            }
        }

        return passwordMap;
    };

    useEffect(() => {
        setIsReusedPasswords(checkReusedPasswords());

        const uniqueCategories = [
            ...new Set(
                passwords.map((p) => p.category).filter((category) => category)
            ),
        ];
        setCategories(uniqueCategories);
    }, [passwords]);

    useEffect(() => {
        setFilteredPasswords(
            selectedCategories.length === 0
                ? passwords
                : passwords.filter((password) =>
                      selectedCategories.includes(password.category)
                  )
        );
    }, [passwords, selectedCategories]);

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleReusedPasswords = (password, currentPasswords) => {
        const reusedPasswords = [];

        for (const reusedPassword of currentPasswords) {
            if (reusedPassword.id !== password.id) {
                reusedPasswords.push(reusedPassword);
            }
        }

        setCurrentReusedPasswords(reusedPasswords);

        onOpen();
    };

    return (
        <Box>
            <HStack
                spacing={4}
                mb={4}
                align="center"
                justify="center"
                mt={4}
                w="full"
            >
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        colorScheme={
                            selectedCategories.includes(category)
                                ? "blue"
                                : "gray"
                        }
                    >
                        {category}
                    </Button>
                ))}
            </HStack>

            <Text mb={2}>Selected Categories:</Text>
            <HStack spacing={2} mb={4} align="center" justify="center" w="full">
                {selectedCategories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        colorScheme="blue"
                    >
                        {category}
                    </Button>
                ))}
            </HStack>

            <List mt={4} spacing={3}>
                {filteredPasswords.map((password) => (
                    <ListItem
                        key={password.id}
                        p={2}
                        borderRadius="md"
                        shadow="md"
                        bg={
                            isReusedPasswords[password.password][0] > 1
                                ? "orange.100"
                                : "gray.100"
                        }
                        _hover={
                            isReusedPasswords[password.password][0] > 1
                                ? { bg: "orange.200" }
                                : { bg: "gray.200" }
                        }
                        cursor="pointer"
                        onClick={() => {
                            handlePasswordClick(password);
                        }}
                    >
                        <HStack>
                            <Text>{password.website} </Text>
                            {isReusedPasswords[password.password][0] > 1 ? (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReusedPasswords(
                                            password,
                                            isReusedPasswords[
                                                password.password
                                            ][1]
                                        );
                                    }}
                                    variant="outline"
                                    ml="auto"
                                    size="sm"
                                    colorScheme="blue"
                                >
                                    Reused
                                </Button>
                            ) : (
                                ""
                            )}
                        </HStack>
                        <Text mt={2}>
                            <PasswordStrength password={password.password} />
                        </Text>
                        <Button
                            colorScheme="red"
                            size="sm"
                            mt={2}
                            w="full"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePassword(password.id);
                            }}
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
            {currentReusedPasswords.length > 0 && (
                <ReusedPasswordModal
                    isOpen={isOpen}
                    onClose={onClose}
                    reusedPasswords={currentReusedPasswords}

                    setSelectedPassword={setSelectedPassword}
                    isPasswordOpen={isPasswordOpen}
                    onPasswordOpen={onPasswordOpen}
                    onPasswordClose={onPasswordClose}                    
                    handleUpdatePassword={handleUpdatePassword}
                />
            )}
        </Box>
    );
};

export default PasswordList;
