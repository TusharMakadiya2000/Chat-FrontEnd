/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import MainContent from "../../components/MainContent";
import ContactSideMenu from "../../components/ContactSubSideMenu";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAppState } from "../../components/utils/useAppState";
import { useNavigate } from "react-router-dom";
function Contact() {
    const [activeItem, setActiveItem] = useState();
    const [userId] = useState(2);
    const [show] = useState(true);
    const [isContactMenuOpen, setIsContactMenuOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.outerWidth <= 767);
    const [{ userList }, setAppState] = useAppState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            if (!token) {
                navigate("/login");
            } else {
                const response = await axios.get(
                    "http://localhost:5000/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
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

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.outerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    return (
        <>
            <section>
                <div className="bg-primary relative w-full h-screen  flex flex-row items-start justify-start box-border text-left text-sm  font-body-regular-14">
                    <SideMenu />
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-start justify-start py-14 pb-2 px-3 sm:px-3 sm:py-14 sm:pb-2 md:p-3 lg:p-3 md:pl-0 lg:pl-0">
                        {show && (
                            <>
                                {isMobile ? (
                                    !activeItem ? (
                                        <ContactSideMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                            setIsContactMenuOpen={
                                                setIsContactMenuOpen
                                            }
                                        />
                                    ) : (
                                        <MainContent
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                            isContactMenuOpen={
                                                isContactMenuOpen
                                            }
                                        />
                                    )
                                ) : (
                                    <>
                                        <ContactSideMenu
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                            setIsContactMenuOpen={
                                                setIsContactMenuOpen
                                            }
                                        />
                                        <MainContent
                                            activeItem={activeItem}
                                            setActiveItem={setActiveItem}
                                            userId={userId}
                                            isContactMenuOpen={
                                                isContactMenuOpen
                                            }
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

export default Contact;
