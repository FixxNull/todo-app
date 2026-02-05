import React, { useEffect, useState , useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Text, Center, Container, Button, useColorModeValue,  useToast } from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";

export const TodoDetail = () => {
    const [todo, setTodo] = useState({});
    const [loading, setLoading] = useState(true);
    const { todoId } = useParams();
    const isMounted = useRef(false);
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600")

    const fetchTodo = useCallback(() => {
        setLoading(true);
        axiosInstance.get(`/todo/${todoId}/`)
            .then((response) => {
                setTodo(response.data);
            })
            .catch((error) => {
                console.error("Error fetching todo:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [todoId]);

    const deleteTodo = () => {
        setLoading(true);
        axiosInstance
            .delete(`/todo/${todoId}`)
            .then(() => {
                toast({
                    title: "Todo deleted successfully",
                    status: "success",
                    isClosable: true,
                    diration: 1500,
                });
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Couldn't delete todo",
                    status: "error",
                    isClosable: true,
                    diration: 2000,
                });
            })
            .finally(() => 
                setLoading(false));
    };

    useEffect(() => {
        if(isMounted.current)
            return;

        fetchTodo();
        isMounted.current = true;
    }, [todoId, fetchTodo]);

    if (loading) {
        return (
            <Container mt={6}>
                <Center mt={6}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='green.200'
                        color='green.500'
                        size="xl"
                    />
                </Center>
            </Container>
        );
    }

    return (
        <>
            <Container mt={6}>
                <Button 
                    colorScheme="gray"
                    onClick={() => navigate("/", { replace: true })}
                >Back</Button>
            </Container>
            <Container 
                bg={background} 
                minHeight="7rem"
                my={3}
                p={3}
                rounded="lg"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontSize={22}>{todo.title}</Text>
                <Text bg="gray.500" mt={2} p={2} rounded="lg">
                    {todo.description}
                </Text>
                <AddUpdateTodoModal
                    my={3}
                    editable={true}
                    defaultValues={{
                        title: todo.title,
                        description: todo.description,
                        status: todo.status,
                    }}
                    onSuccess={fetchTodo}
                />
                 <Button
                    isLoading={loading}
                    colorScheme="red"
                    width="100%"
                    onClick={deleteTodo}
                >
                    Delete
                </Button>
            </Container>
        </>
    );
}