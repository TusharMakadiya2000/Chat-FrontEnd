import { useRef, useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import CallMenu from "../../components/call-items/CallMenu";
import SubSideMenuCall from "../../components/CallSubSideMenu";

function Call() {
    const chatScroll: any = useRef(null);
    const [activeItem, setActiveItem] = useState();
    const [userId] = useState(2);
    const [show] = useState(true);

    const [isMobile, setIsMobile] = useState(window.outerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.outerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        chatScroll.current && chatScroll.current.scrollToBottom(0, 0);
    });
    return (
        <>
            <section>
                <div className="bg-primary  relative w-full h-screen  flex flex-row items-start justify-start box-border text-left text-sm font-body-regular-14">
                    <SideMenu />
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-start justify-start py-14 pb-2 px-3 sm:px-3 sm:py-14 sm:pb-2 md:p-3 lg:p-3 md:pl-0 lg:pl-0">
                        {show && (
                            <>
                                {isMobile ? (
                                    !activeItem ? (
                                        <SubSideMenuCall
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                    ) : (
                                        <CallMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                    )
                                ) : (
                                    <>
                                        <SubSideMenuCall
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                        <CallMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Call;
