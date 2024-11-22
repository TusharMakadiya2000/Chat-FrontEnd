//import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
//import ScrollToBottom from 'react-scroll-to-bottom';

import SideMenu from "../../components/SideMenu";

import CallMenu from "../../components/call-items/CallMenu";
import SubSideMenuCall from "../../components/CallSubSideMenu";

function Call() {
    const chatScroll: any = useRef(null);
    const [activeItem, setActiveItem] = useState();
    const [userId] = useState(2);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [show] = useState(true);

    useEffect(() => {
        chatScroll.current && chatScroll.current.scrollToBottom(0, 0);
    });

    return (
        <>
            <section>
                <div className="bg-primary  relative w-full h-screen  flex flex-row items-start justify-start box-border  text-left text-sm  font-body-regular-14">
                    <SideMenu />
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-start justify-start p-3 pl-0">
                        <SubSideMenuCall />
                        <CallMenu
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                            userId={userId}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Call;
