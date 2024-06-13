import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const LoadingOverlay = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.3)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1500"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default LoadingOverlay;