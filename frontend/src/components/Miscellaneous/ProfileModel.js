import React from 'react';
import { IconButton, useDisclosure, Button, Image, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const ProfileModel = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? <span onClick={onOpen}>{children}</span> : (
                    <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
                )
            }
            <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered >
                <ModalOverlay />
                <ModalContent h={"410px"}>
                    <ModalHeader
                        fontSize={"40px"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent="center"
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        flexDirection="column"

                    >
                        <Image
                            borderRadius={"full"}
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}
                            objectFit={"cover"}

                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                        >
                            Email: {user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button backgroundColor='blue' color={"white"} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel