import React, { useState } from "react";
import { Box, Input, Button, HStack } from "@chakra-ui/react";
import PasswordStrength from "./PasswordStrength";

const PasswordAdd = ({ handleAddPassword }) => {
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    
    const onAddPassword = () => {
        handleAddPassword(website, password, category, notes);
        // Clear the input fields after adding the password
        setWebsite("");
        setPassword("");
        setCategory("");
        setNotes("");
    };

    return (
        <Box>
            <Box>
                <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    mb={4}
                    placeholder="Website"
                />
                <Box mb={4}>
                    <HStack>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <Button onClick={() => setShowPassword(!showPassword)} variant="ghost" colorScheme="blue" size="sm">
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </HStack>
                    <PasswordStrength password={password} />
                </Box>
                <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    mb={4}
                    placeholder="Category"
                />
                <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    mb={4}
                    placeholder="Notes"
                />
            </Box>
            <Button mt={4} colorScheme="green" onClick={onAddPassword} w="full">
                Add Password
            </Button>
        </Box>
    );
};

export default PasswordAdd;
