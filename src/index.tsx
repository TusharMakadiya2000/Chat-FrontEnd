import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Chat from "./pages/chat/chat";
import Login from "./pages/Login";
import IconList from "./pages/Icons";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/forgot-password";
// import ResetPassword from "./pages/reset-password";
import Call from "./pages/call/call";
import Contact from "./pages/contact/contact";
import ChangePassword from "./pages/change-password";
import Saved from "./pages/saved/saved";
import MyProfile from "./pages/my-profile/profile";
import Setting from "./pages/setting/setting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
const queryClient = new QueryClient();
import PrivateRoute from "./PrivateRoute";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    {/* <App /> */}
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Login />} />

                            <Route path="/icons" element={<IconList />} />

                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact-us" element={<ContactUs />} />

                            <Route path="/login" element={<Login />} />
                            <Route path="/Signup" element={<Signup />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            {/* <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        /> */}
                            <Route
                                path="/change-password"
                                element={<ChangePassword />}
                            />
                            <Route
                                path="/chat"
                                element={
                                    <PrivateRoute>
                                        <Chat />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/call"
                                element={
                                    <PrivateRoute>
                                        <Call />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/contact"
                                element={
                                    <PrivateRoute>
                                        <Contact />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/saved"
                                element={
                                    <PrivateRoute>
                                        <Saved />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/my-profile"
                                element={
                                    <PrivateRoute>
                                        <MyProfile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/setting"
                                element={
                                    <PrivateRoute>
                                        <Setting />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

reportWebVitals();
