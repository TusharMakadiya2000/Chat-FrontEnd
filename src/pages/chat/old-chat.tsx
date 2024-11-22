import { useState } from "react";
import SideMenu from "../../components/SideMenu";
import ChatSubSideMenu from "../../components/ChatSubSideMenu";
import MainContent from "../../components/MainContent";

function ChatOld() {
    const [activeItem, setActiveItem] = useState();
    const [userId] = useState(2);
    const [show] = useState(true);

    return (
        <>
            <section>
                <div className="bg-primary  relative w-full h-screen  flex flex-row items-start justify-start p-3 box-border  gap-2 text-left text-sm  font-body-regular-14">
                    <SideMenu />
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-start justify-start">
                        {show && (
                            <ChatSubSideMenu
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                userId={userId}
                            />
                        )}
                        {
                            <MainContent
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                userId={userId}
                            />
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChatOld;
