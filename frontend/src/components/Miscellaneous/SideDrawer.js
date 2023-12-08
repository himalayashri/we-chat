import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Text, Box, Avatar, Input, Spinner } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/chatLogics';
import "../style.css"

const SideDrawer = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const history = useHistory();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        history.push('/')
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please Enter something in search',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setSearchResult(data);

            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error Occurred',
                description: "Failed to load the search results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }


    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post("/api/chat", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
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




    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"white"}
                w={"100%"}
                p={"5px 10px"}
                borderWidth={"5px"}
            >

                <Tooltip label="Search Users to chat" placement='bottom-end' hasArrow >
                    <Button variant={"ghost"} onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>

                    </Button>

                </Tooltip>
                <Text fontSize={"2xl"} fontFamily="Work sans">
                    WE-CHAT
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1} height={"30px"}>

                            <BellIcon fontSize={"2xl"} m={1} />

                            <div>
                                {notification.length > 0 && (
                                    <div className="notification-badge">
                                        <span className="badge">
                                            {notification.length}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem key={notif._id} onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => n !== notif))
                                }}>
                                    {notif.chat.isGroupChat ? `New Message is ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size={"sm"} cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>

                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>

                        </MenuList>
                    </Menu>

                </div>

            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    {/* <DrawerCloseButton /> */}
                    <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

                    <DrawerBody >
                        <Box display={"flex"} pb={2}>
                            <Input placeholder='Search by name or email..' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            )
                            )
                        )
                        }
                        {loadingChat && <Spinner ml={"auto"} display={"flex"} />}

                    </DrawerBody>


                </DrawerContent>


            </Drawer>
        </>
    )
}

export default SideDrawer;