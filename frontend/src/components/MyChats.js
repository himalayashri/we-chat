import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from '../components/ChatLoading';
import { getSender } from '../config/chatLogics';
import GroupChatModal from './Miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain, setFetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: 'Error fetching the chat',
                description: error.messase,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }

    }
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats();
    }, [fetchAgain])
    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir={"column"}
            w={{ base: "100%", md: "31%" }}
            bg="white"
            p={3}
            alignItems="center"
            borderRadius={"lg"}
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display={"flex"}
                d="flex"
                w={"100%"}
                justifyContent="space-between"
                alignItems={"center"}
            >
                My Chats
                <GroupChatModal>
                    <Button
                        display={"flex"}
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                p={3}
                display={"flex"}
                bg={"#F8F8F8"}
                flexDir={"column"}
                w={"100%"}
                h="100%"
                borderRadius={"lg"}
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY={"scroll"}>
                        {
                            chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                                    </Text>

                                </Box>
                            ))
                        }
                    </Stack>
                ) : (
                    <ChatLoading />
                )}

            </Box>


        </Box>
    )
}

export default MyChats;