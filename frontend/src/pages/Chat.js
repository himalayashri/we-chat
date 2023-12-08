import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox"
import { useState } from "react";


function Chat() {

    const { user } = ChatState();
    const { fetchAgain, setFetchAgain } = useState(false);



    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display={"flex"}
                w="100%"
                justifyContent={"space-between"}
                h={"91.5vh"}
                p={"10px"}
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

            </Box>

        </div >
    )
}

export default Chat;