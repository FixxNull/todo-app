import React, { useEffect, useRef, useState } from 'react';
import { Center, Container, Spinner, Box } from '@chakra-ui/react';
import axiosInstance from '../../services/axios';
import { TodoCard } from './TodoCard';
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";

export const TodoList = () => {
    const [ todos, setTodos ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const isMounted = useRef(false);

    useEffect(() =>{
        if (isMounted.current) 
            return;
        // Fetch todos from API or context here
        fetchTodos();
        isMounted.current = true;
    }, []);
      
    const fetchTodos = () => {
        setLoading(true);
        axiosInstance.get('/todo/').then((res) => {
            setTodos(res.data);
        }).catch((error) => {
            console.error("Error fetching todos:", error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Container mt={9}>
            {/* Add TodoModal */}
             <AddUpdateTodoModal onSuccess={fetchTodos} />
            {loading ? (
                <Center mt={6}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='green.200'
                        color='green.500'
                        size="xl"
                    />
                </Center>
            ):(
                <Box mt={6}>
                    {todos?.map(todo =>(<TodoCard key={todo.id} todo={todo} />))}
                </Box>
            ) }
        </Container>
    );
};