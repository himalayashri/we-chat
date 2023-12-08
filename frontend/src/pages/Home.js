import React, { useEffect } from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom'


function Home() {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        if (user) {
            history.push('/chats')
        }
    }, [history])


    return (
        <Container maxW='xl' centerContent>

            <Box
                bg='white'
                w='100%'
                p={3}
                d='flex'
                justifyContent='center'
                width='100%'
                m='40px 0 15px 0'
                borderRadius="lg"
                borderWidth={'1px'}
            >
                <Text color={'black'} fontSize={'4xl'} fontFamily={'work sans'} textAlign={'center'}>TALK-A-TIVE</Text>
            </Box>
            <Box bg={'white'}
                w={'100%'}
                p={4}
                borderRadius={'lg'}
                borderWidth={'1px'}

            >
                <Tabs variant='soft-rounded'>
                    <TabList mb={'1em'}>
                        <Tab width={'50%'}>Login</Tab>
                        <Tab width={'50%'}>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

        </Container>
    )
}

export default Home;