import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    useDisclosure,
} from"@chakra-ui/react";
import axiosInstance from '../axiosConfig';
import PasswordModal from "./PasswordModal";
import PasswordList from "./PasswordList";
import PasswordAdd from "./PasswordAdd";
import LoadingOverlay from "./LoadingOverlay";

const PasswordManager = () => {
    const [passwords, setPasswords] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPassword, setSelectedPassword] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleAddPassword = async (website, password, category, notes) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "http://localhost:5000/api/passwords",
                {
                    website: website,
                    password: password,
                    category: category,
                    notes: notes,
                },
            );

            console.log(response);

            setPasswords([...passwords, response.data.password]);
        } catch (error) {
            console.error("Failed to add password:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPasswords = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                "http://localhost:5000/api/passwords"

            );

            setPasswords(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch passwords:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePassword = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`http://localhost:5000/api/passwords/${id}`);

            setPasswords(passwords.filter((password) => password.id !== id));
        } catch (error) {
            console.error("Failed to delete password:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordClick = (password) => {
        setSelectedPassword(password);
        onOpen();
    };

    const handleUpdatePassword = async () => {
        setLoading(true);
        try {
            await axiosInstance.put(
                `http://localhost:5000/api/passwords/${selectedPassword.id}`,
                {
                    website: selectedPassword.website,
                    password: selectedPassword.password,
                    category: selectedPassword.category,
                    notes: selectedPassword.notes,
                }
            );

            setPasswords(
                passwords.map((p) =>
                    p.id === selectedPassword.id ? selectedPassword : p
                )
            );
            onClose();
        } catch (error) {
            console.error("Failed to update password:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPasswords();
    }, []);


    return (
        <Flex align="center" justify="center">
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
                    Password Manager
                </Heading>

                <PasswordAdd handleAddPassword={handleAddPassword} />

                <PasswordList
                    passwords={passwords}
                    handlePasswordClick={handlePasswordClick}
                    handleDeletePassword={handleDeletePassword}

                    setSelectedPassword={setSelectedPassword}
                    isPasswordOpen={isOpen}
                    onPasswordOpen={onOpen}
                    onPasswordClose={onClose}
                    handleUpdatePassword={handleUpdatePassword}
                />

                {selectedPassword && (
                    <PasswordModal
                        isOpen={isOpen}
                        onClose={onClose}
                        selectedPassword={selectedPassword}
                        setSelectedPassword={setSelectedPassword}
                        handleUpdatePassword={handleUpdatePassword}
                    />
                )}
            </Box>
        </Flex>
    );
};
export default PasswordManager;
