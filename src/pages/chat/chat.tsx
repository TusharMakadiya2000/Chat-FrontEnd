import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import ChatSubSideMenu from "../../components/ChatSubSideMenu";
import MainContent from "../../components/MainContent";
import axios from "axios";
import { useAppState } from "../../components/utils/useAppState";
import { useNavigate } from "react-router-dom";

function Chat() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState();
    const [userId] = useState(100);
    const [show] = useState(true);
    const [isMobile, setIsMobile] = useState(window.outerWidth <= 767);
    const [{ userList, groupList, broadcastList }, setAppState] = useAppState();
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
        try {
            if (!token) {
                navigate("/login");
            } else {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        timeout: 5000,
                    }
                );
                if (response.status === 401) {
                    navigate("/login");
                }
                setAppState({ userList: response.data });
                return response.data;
            }
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.status === 401
            ) {
                console.error("Unauthorized: Redirecting to login.");
                navigate("/login");
            } else {
                console.error("Error fetching user data:", error);
            }
            throw error;
        }
    };
    const fetchGroup = async () => {
        try {
            if (!token) {
                navigate("/login");
            } else {
                const groupData = await axios.get(
                    "http://192.168.1.47:5000/api/groups",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        timeout: 5000,
                    }
                );
                if (groupData.status === 401) {
                    navigate("/login");
                }
                setAppState({ groupList: groupData.data });
                return groupData.data;
            }
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.status === 401
            ) {
                console.error("Unauthorized: Redirecting to login.");
                navigate("/login");
            } else {
                console.error("Error fetching user data:", error);
            }
            throw error;
        }
    };

    const fetchBroadcast = async () => {
        try {
            if (!token) {
                navigate("/login");
            } else {
                const broadcastData = await axios.get(
                    "http://192.168.1.47:5000/api/broadcast",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        timeout: 5000,
                    }
                );
                if (broadcastData.status === 401) {
                    navigate("/login");
                }
                setAppState({ broadcastList: broadcastData.data });
                return broadcastData.data;
            }
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.status === 401
            ) {
                console.error("Unauthorized: Redirecting to login.");
                navigate("/login");
            } else {
                console.error("Error fetching user data:", error);
            }
            throw error;
        }
    };

    useEffect(() => {
        fetchUser();
        fetchGroup();
        fetchBroadcast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.outerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <section>
                <div className="bg-primary relative w-full h-screen flex flex-row items-start justify-start box-border text-left text-sm font-body-regular-14">
                    <SideMenu />
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-start justify-start py-14 pb-2 px-3 md:p-3 md:pl-0">
                        {show && (
                            <>
                                {isMobile ? (
                                    !activeItem ? (
                                        <ChatSubSideMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                    ) : (
                                        <MainContent
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                    )
                                ) : (
                                    <>
                                        <ChatSubSideMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                        />
                                        <MainContent
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

export default Chat;
