import { useState, useEffect } from "react";
import { userItemType2 } from "./utils/types";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Define the interface for the token payload (adjust based on your actual token structure)
interface TokenPayload extends JwtPayload {
    userId: string;
    name: string;
}

const ProfileUserListProvider = () => {
    const [ProfileUser, setProfileUser] = useState<userItemType2>();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode<TokenPayload>(token);
                setProfileUser({
                    id: decoded.userId,
                    name: decoded.name,
                });
            } catch (err) {
                console.error("Failed to decode token:", err);
            }
        }
    }, []);

    return ProfileUser;
};

export default ProfileUserListProvider;
