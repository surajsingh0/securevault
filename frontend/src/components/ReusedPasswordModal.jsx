import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";
import PasswordModal from "./PasswordModal";

const ReusedPasswordModal = ({
    isOpen,
    onClose,
    reusedPasswords,
    setSelectedPassword,
    isPasswordOpen,
    onPasswordOpen,
    onPasswordClose,
    handleUpdatePassword,
}) => {

    const [currentPassword, setCurrentSelectedPassword] = useState(null);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reused in</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {reusedPasswords.map((password) => (
                        <Box
                            onClick={() => {
                                setSelectedPassword(password);
                                setCurrentSelectedPassword(password);
                                onPasswordOpen();
                            }}
                            key={password.id}
                            mb={4}
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            rounded="md"
                            shadow="md"
                            w="full"
                            maxW="md"
                            bg="gray.100"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ bg: "gray.200" }}
                        >
                            <Text fontWeight="bold" mb={1} fontSize="lg">
                                {password.website}
                            </Text>
                            {/* <Text>{password.password}</Text> */}
                        </Box>
                    ))}
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>

            {currentPassword && (
                    <PasswordModal
                        isOpen={isPasswordOpen}
                        onClose={onPasswordClose}
                        selectedPassword={currentPassword}
                        setSelectedPassword={setSelectedPassword}
                        handleUpdatePassword={handleUpdatePassword}
                    />
                )}
        </Modal>
    );
};

export default ReusedPasswordModal;
