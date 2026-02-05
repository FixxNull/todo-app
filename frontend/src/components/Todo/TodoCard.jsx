import { Flex, useColorModeValue, Text, Badge } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const TodoCard = ({ todo }) => {
    const navigate = useNavigate();
    return (
        <Flex
            shadow="lg" 
            background={useColorModeValue('gray.300', 'gray.600')} 
            minHeight="3rem" 
            p={3}
            my={3}
            rounded="lg"
            alignItems="center"
            justifyContent="space-between"
            _hover={{
                opacity: 0.9,
                cursor: "pointer",
                transform: "translateY(-3px)"
            }}
            onClick={() => navigate(`/${todo.todo_id}`, { replace: true })} 
        >
            <Text>{todo.title}</Text>
            <Badge 
                colorScheme={todo.status ? "green" : "yellow"}>
                    {todo.status ? "Completed" : "Pending"}
            </Badge>
        </Flex>
    );
}