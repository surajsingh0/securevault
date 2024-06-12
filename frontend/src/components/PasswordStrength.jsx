import React, { useEffect, useState } from "react";
import { Box, Progress } from "@chakra-ui/react";

const PasswordStrength = ({ password }) => {
    const [strength, setStrength] = useState(0);

    const evaluatePassword = (pwd) => {
        let score = 0;

        // Criteria for password strength
        if (pwd.length >= 8) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

        setStrength(score);
    };

    useEffect(() => {
        evaluatePassword(password);
    }, [password]);

    return (
        <Box width="full" margin="auto" textAlign="center">
            <Progress
                value={(strength / 4) * 100}
                size="xs"
                colorScheme={["red", "red", "orange", "green", "green"][strength]}
                mb={2}
            />
        </Box>
    );
};

export default PasswordStrength;
