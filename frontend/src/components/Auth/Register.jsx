import React from 'react';
import { Flex, 
         useColorModeValue, 
         Heading, 
         FormControl, 
         Input, 
         FormErrorMessage, 
         Button,
         useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ThemeToggler } from '../Thene/ThemeToggler';
import axiosInstance from '../../services/axios';

export const Register = () => {
    const {handleSubmit, register, formState: { errors, isSubmitting }} = useForm();
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async (values) => {
        // Handle form submission
        try {
            await axiosInstance.post('/users/create/', values); 
            toast({
                title: "Account created.",
                description: "Your account has been created successfully. You can now log in.",
                status: "success",
                duration: 1500,
                isClosable: true,
            });
            navigate('/login', { replace: true });
        } catch (error) {
            toast({
                title: "Registration failed.",
                description: error.response?.data?.detail || "An error occurred during registration.",
                status: "error",
                duration: 1500,
                isClosable: true
            });
            console.error("Registration error:", error);
        }
    };

    return (
        <Flex height="100vh" align="center" justifyContent="center">
            <Flex direction="column" 
                alignItems="center" 
                background={useColorModeValue('gray.100', 'gray.700')}
                p={12}
                rounded={6}>
                <Heading mb={6}>Register</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.email}>
                        <Input placeholder="Email"
                               background={useColorModeValue('gray.300', 'gray.600')}
                               type="email"
                               size="lg" 
                               mt={6}
                               {
                                ...register("email", { 
                                    required: "This is required field",   
                                })}
                        />
                        <FormErrorMessage>{errors.email && errors.email?.message}</FormErrorMessage>
                    </FormControl>
                     <FormControl isInvalid={errors.username}>
                        <Input placeholder="Username"
                               background={useColorModeValue('gray.300', 'gray.600')}
                               type="text"
                               variant="filled"
                               size="lg" 
                               mt={6}
                               {
                                ...register("username", { 
                                    required: "This is required field",
                                    minLength: { 
                                        value: 5, 
                                        message: "Username must be at least 5 characters long" 
                                    },
                                    maxLength: { 
                                        value: 24, 
                                        message: "Username must be at most 24 characters long" 
                                    },
                                })}
                        />
                        <FormErrorMessage>{errors.username && errors.username?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <Input placeholder="Password"
                               background={useColorModeValue('gray.300', 'gray.600')}
                               type="password"
                               size="lg" 
                               mt={6}
                               {
                                ...register("password", { 
                                    required: "This is required field",
                                    minLength: { 
                                        value: 5, 
                                        message: "Password must be at least 5 characters long" 
                                    }, 
                                    maxLength: { 
                                        value: 24, 
                                        message: "Password must be at most 24 characters long" 
                                    },
                                })}
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
                           Register
                    </Button>
                </form>
                <ThemeToggler showLabel={true} />
                <Button 
                    onClick={() => navigate('/login', { replace: true })}
                    width="100%"
                    colorScheme="gray"
                    variant="outline"
                    mt={6} >
                        Login Instead
                </Button>
            </Flex>
        </Flex>
    );
}   
