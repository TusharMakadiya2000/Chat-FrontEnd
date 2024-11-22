// useAuthUser.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileUserListProvider from "./ProfileUserList";
import { userItemType } from "./utils/types";

const useAuthUser = () => {
    const [user, setUser] = useState<userItemType | null>(null);
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUserId) {
            const fetchUser = async () => {
                try {
                    if (!token) {
                        navigate("/login");
                    } else {
                        const response = await axios.get(
                            `http://192.168.1.47:5000/api/users/${loggedInUserId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        if (response.status === 401) {
                            navigate("/login");
                        } else {
                            setUser(response.data);
                        }
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
            fetchUser();
        }
    }, [loggedInUserId, navigate, token]);
    return user;
};

export default useAuthUser;
