import React from "react";
import { Box, Flex, useColorModeValue, Text, Stack, Button, Image } from "@chakra-ui/react";
import { ThemeToggler } from "../Thene/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

export const NavBar = () => {
    const { logout } = useAuth();
    const logoSrc = '/todo-app.svg';
    return (
        <Box minHeight="100зч">
            <Flex as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                p={2}
                bg={useColorModeValue('green.300', 'green.600')}
                color="white"
            >
                {/* <Stack direction="row" align="left" spacing={4}>
                    <Image 
                    src={logoSrc} 
                    alt="TodoApp Logo" 
                    width="200px"      
                    height="80px"      
                    maxHeight="80px"  
                    />
                </Stack> */}
                <Text as="h2" fontSize="24" fontWeight="bold">Todo-App</Text>
                <Stack direction="row" align="center" spacing={4}>
                    {/* Additional NavBar content can go here */}
                    <ThemeToggler size="lg"/>
                    <Button onClick={logout} colorScheme="green">Logout</Button>
                </Stack>
            </Flex>
            <Outlet />
        </Box>
    );
}