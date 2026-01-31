import React from 'react';
import { Flex, useColorModeValue, Heading, FormControl, Input, FormErrorMessage, Button, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ThemeToggler } from '../Thene/ThemeToggler';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
    const {handleSubmit, register, formState: { errors, isSubmitting }} = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    const onSubmit = async (values) => {
        // Handle form submission
        try {
            await login(values.email, values.password);
        } catch(error) {
            toast({
                title: "Invalid email or password",
                description: error.response?.data?.detail || "An error occurred during login.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: "top-right"
            }); 
        }
    };

    return (
        <Flex height="100vh" align="center" justifyContent="center">
            <Flex direction="column" 
                alignItems="center" 
                background={useColorModeValue('gray.100', 'gray.700')}
                p={12}
                rounded={6}>
                <Heading mb={6}>Login</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.email}>
                        <Input placeholder="Email"
                               background={useColorModeValue('gray.300', 'gray.600')}
                               type="email"
                               size="lg" 
                               mt={6}
                               {...register("email", { required: "This is required field" })}
                        />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <Input placeholder="Password"
                               background={useColorModeValue('gray.300', 'gray.600')}
                               type="password"
                               size="lg" 
                               mt={6}
                               {...register("password", { required: "This is required field" })}
                        />
                        <FormErrorMessage>{errors.password && errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <Button 
                        isLoading={isSubmitting}
                        loadingText="Submitting"
                        width="100%"
                        colorScheme="green"
                        variant="outline"
                        type="submit" 
                        mt={6}
                        mb={6}>
                           Login
                    </Button>
                </form>
                <ThemeToggler showLabel={true} />
                <Button 
                    onClick={() => navigate('/register', { replace: true })}
                    width="100%"
                    colorScheme="gray"
                    variant="outline"
                    mt={6} >
                        Register Instead
                </Button>
            </Flex>
        </Flex>
    );
}   
