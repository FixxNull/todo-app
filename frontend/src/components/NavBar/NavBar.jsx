import React from "react";
import { 
    Box, 
    Flex, 
    useColorModeValue, 
    Stack,
    IconButton, 
    Image } from "@chakra-ui/react";
import { ThemeToggler } from "../Thene/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

export const NavBar = () => {
    const { logout } = useAuth();
    return (
        <Box>
            <Flex as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                p={2}
                bg={useColorModeValue('green.400', 'green.800')}
                color="white"
            >
                <Stack direction="row" align="left" spacing={4}>
                    <Image 
                        src='/todo-app.svg'
                        alt="TodoApp Logo" 
                        width="200px"        
                    />
                </Stack>
                <Stack direction="row" align="center" spacing={4}>
                    {/* Additional NavBar content can go here */}
                    <ThemeToggler size="lg"/>
                    <IconButton
                        onClick={logout}
                        colorScheme="green"  // Вместо color="white"
                        isRound={true}
                        aria-label="Logout"
                        icon={<CiLogout fontSize={20}/>}
                        size="sm"
                    />
                </Stack>
            </Flex>
            <Outlet />
        </Box>
    );
}