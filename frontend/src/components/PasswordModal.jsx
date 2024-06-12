import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    HStack,
    Box,
} from "@chakra-ui/react";
import PasswordStrength from "./PasswordStrength";

const PasswordModal = ({
    isOpen,
    onClose,
    selectedPassword,
    setSelectedPassword,
    handleUpdatePassword,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedPassword.website}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        value={selectedPassword.website}
                        onChange={(e) =>
                            setSelectedPassword({
                                ...selectedPassword,
                                website: e.target.value,
                            })
                        }
                        mb={4}
                        placeholder="Website"
                    />
                    <Box mb={4}>
                        <HStack>
                            <Input
                                value={selectedPassword.password}
                                onChange={(e) =>
                                    setSelectedPassword({
                                        ...selectedPassword,
                                        password: e.target.value,
                                    })
                                }
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />

                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                variant="ghost"
                                colorScheme="blue"
                                size="sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </HStack>
                        <PasswordStrength
                            password={selectedPassword.password}
                        />
                    </Box>

                    <Input
                        value={selectedPassword.category}
                        onChange={(e) =>
                            setSelectedPassword({
                                ...selectedPassword,
                                category: e.target.value,
                            })
                        }
                        mb={4}
                        placeholder="Category"
                    />
                    <Input
                        value={selectedPassword.notes}
                        onChange={(e) =>
                            setSelectedPassword({
                                ...selectedPassword,
                                notes: e.target.value,
                            })
                        }
                        mb={4}
                        placeholder="Notes"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleUpdatePassword}
                    >
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PasswordModal;
