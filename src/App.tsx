import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { StateProvider } from "./components/utils/useAppState";

function App() {
    const location = useLocation();

    const excludedPaths = [
        "/chat",
        "/call",
        "/Signup",
        "/login",
        "/forgot-password",
        "/change-password",
        // "/reset-password",
        "/contact",
        "/saved",
        "/my-profile",
        "/setting",
    ];

    const showHeaderFooter = !excludedPaths.includes(location.pathname);

    return (
        <div className="App dark:bg-slate-900 text-text dark:text-text-dark relative">
            <StateProvider>
                <ToastContainer />
                {showHeaderFooter && <Header />}
                <div
                    className={`content-div ${
                        showHeaderFooter
                            ? "mt-[65px] min-h-[calc(100vh-130px)]"
                            : ""
                    }`}
                >
                    <Outlet />
                    {showHeaderFooter && <Footer />}
                </div>
            </StateProvider>
        </div>
    );
}

export default App;
