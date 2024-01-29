import React, { useState, useEffect } from "react";
import { Box, Container, Grid, GridItem, Text, VStack, HStack, Heading } from "@chakra-ui/react";
import { FaAppleAlt } from "react-icons/fa";

const Index = () => {
  const [snakePositions, setSnakePositions] = useState([22, 37, 52]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      setSnakePositions((prevPositions) => {
        const newHead = prevPositions[0] + direction.x + direction.y * gridSize;
        const newPositions = [newHead, ...prevPositions.slice(0, -1)];
        return newPositions;
      });
    };

    const gameLoop = setInterval(moveSnake, 200);

    return () => clearInterval(gameLoop);
  }, [direction]);
  // Define the size of the game area
  const gridSize = 15;
  const gridItems = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  // Removed static snake positions initialization since it is now managed by useState

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl" mb={4}>
          Snake Game Prototype
        </Heading>
        <Box w="100%" h="500px" bg="black" position="relative">
          <Grid templateColumns={`repeat(${gridSize}, 1fr)`} templateRows={`repeat(${gridSize}, 1fr)`} h="100%" w="100%" gap={1}>
            {gridItems.map((_, index) => (
              <GridItem key={index} bg={snakePositions.includes(index) ? "green" : "transparent"} w="100%" h="100%" />
            ))}
            {/* Place a food item at a fixed position for demonstration */}
            <Box position="absolute" left="calc(20% + 4px)" top="calc(40% + 4px)" color="red.500">
              <FaAppleAlt size="1.5em" />
            </Box>
          </Grid>
        </Box>
        <HStack justify="space-between" w="100%">
          <Text fontSize="xl" color="green.500">
            Score: 0
          </Text>
          {/* Placeholder for future controls */}
          <Text fontSize="xl" color="green.500">
            Controls: ↑ ← ↓ →
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
