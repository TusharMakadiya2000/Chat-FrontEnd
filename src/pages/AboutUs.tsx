import React, { useState } from "react";

const AboutUs = () => {
    /*const [aboutlist] = useState([
        {
            decs: "Transactions every 24 hours",
            value: "44 million",
        },
        {
            decs: "Assets under holding",
            value: "$119 trillion",
        },
        {
            decs: "New users annually",
            value: "46,000",
        },
        {
            title: "Be world-class",
            subtitle:
                "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
        },
        {
            title: "Share everything you know",
            subtitle:
                "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
        },
        {
            title: "Always learning",
            subtitle:
                "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
        },
        {
            title: "Be supportive",
            subtitle:
                "Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.",
        },
        {
            title: "Take responsibility",
            subtitle:
                " Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error. ",
        },
        {
            title: "Enjoy downtime",
            subtitle:
                "Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio. ",
        },
    ]);
   */

    const [companyList] = useState([
        {
            image: "https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg",
        },
        {
            image: "https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg",
        },
        {
            image: "https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg",
        },
        {
            image: "https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg",
        },
        {
            image: "https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg",
        },
    ]);
    const [ourTeamList] = useState([
        {
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Michael Henry",
            position: " Co-Founder / CTO",
        },
        {
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Dries Foster",
            position: "Business Relations",
        },
        {
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Lindsay Vincent",
            position: "Front-end Developer",
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Courtney Walton",
            position: "Designer",
        },
        {
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Tom Henry",
            position: "Director of Product",
        },
        {
            image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Whitney Cook",
            position: "Copywriter",
        },
        {
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Michael Foster",
            position: " Co-Founder / CTO",
        },
        {
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Dries Vincent",
            position: "Business Relations",
        },
        {
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Lindsay Walton",
            position: "Front-end Developer",
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Courtney Henry",
            position: "Designer",
        },
        {
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Tom Cook",
            position: "Director of Product",
        },
        {
            image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
            name: "Whitney Francis",
            position: "Copywriter",
        },
    ]);
    /*
    const [blogList] = useState([
        {
            img: "../images/photo-1.png",
            date: "Mar 16, 2020",
            name: "Michael Foster",
            desc: " Boost your conversion rate",
            personImg: "../images/person-1.png",
        },
        {
            img: "../images/photo-2.png",
            date: "Mar 16, 2020",
            name: "Michael Foster",
            desc: " Boost your conversion rate",
            personImg: "../images/person2.png",
        },
        {
            img: "../images/photo-3.png",
            date: "Mar 16, 2020",
            name: "Michael Foster",
            desc: " Boost your conversion rate",
            personImg: "../images/person3.png",
        },
    ]); */
    return (
        <>
            <div className="mx-24 overflow-hidden">
                <div className="flex items-center gap-x-40 pt-10">
                    <div className="flex-shrink-0">
                        <div className="w-full max-w-2xl">
                            <h1 className="text-6xl font-bold dark:text-white text-gray-900">
                                We're changing the way people connect.
                            </h1>
                            <p className="max-w-none leading-8 dark:text-gray-400 text-gray-500 mt-6 text-lg">
                                Cupidatat minim id magna ipsum sint dolor qui.
                                Sunt sit in quis cupidatat mollit aute velit. Et
                                labore commodo nulla aliqua proident mollit
                                ullamco exercitation tempor. Sint aliqua anim
                                nulla sunt mollit id pariatur in voluptate
                                cillum. Eu voluptate tempor esse minim amet
                                fugiat veniam occaecat aliqua.
                            </p>
                        </div>
                    </div>

                    <div className="gap-8 flex">
                        <div className="ml-auto w-44 flex-none pt-80">
                            <img
                                className="drop-shadow-xl border rounded-xl w-full max-w-full aspect-[2/3] h-auto object-cover"
                                src="./images/photo-board.avif"
                                alt=""
                            />
                        </div>
                        <div className="ml-auto w-44 flex-none pt-36">
                            <img
                                className="drop-shadow-xl border rounded-xl w-full max-w-full aspect-[2/3] h-auto object-cover"
                                src="./images/photo-girlsmile.avif"
                                alt=""
                            />
                            <img
                                className="drop-shadow-xl border rounded-xl w-full max-w-full aspect-[2/3] h-auto object-cover mt-8"
                                src="./images/photo-hotelhall.avif"
                                alt=""
                            />
                        </div>
                        <div className="ml-auto w-44 flex-none">
                            <img
                                className="drop-shadow-xl border rounded-xl w-full max-w-full aspect-[2/3] h-auto object-cover"
                                src="./images/photo-talkgirl.avif"
                                alt=""
                            />
                            <img
                                className="drop-shadow-xl border rounded-xl w-full max-w-full aspect-[2/3] h-auto object-cover mt-8"
                                src="./images/photo-talkboy.avif"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {/* our mission */}
                <div className="py-20 grid grid-cols-2 gap-x-5 ">
                    <div>
                        <h2 className="text-4xl font-bold">Our mission</h2>
                        <p className="mt-4 dark:text-gray-400 text-gray-600 text-lg ">
                            Aliquet nec orci mattis amet quisque ullamcorper
                            neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                            eget aliquam. Quisque id at vitae feugiat egestas
                            ac. Diam nulla orci at in viverra scelerisque eget.
                            Eleifend egestas fringilla sapien.
                        </p>
                        <div className="mt-10 max-w-xl  ">
                            <p className="mt-4 dark:text-gray-400 text-gray-500 text-base">
                                Faucibus commodo massa rhoncus, volutpat.
                                Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor
                                praesent donec est. Odio penatibus risus viverra
                                tellus varius sit neque erat velit. Faucibus
                                commodo massa rhoncus, volutpat. Dignissim sed
                                eget risus enim. Mattis mauris semper sed amet
                                vitae sed turpis id.
                            </p>

                            <p className="mt-4 dark:text-gray-400  text-gray-500 text-base">
                                Et vitae blandit facilisi magna lacus commodo.
                                Vitae sapien duis odio id et. Id blandit
                                molestie auctor fermentum dignissim. Lacus diam
                                tincidunt ac cursus in vel. Mauris varius
                                vulputate et ultrices hac adipiscing egestas.
                                Iaculis convallis ac tempor et ut. Ac lorem vel
                                integer orci.
                            </p>
                        </div>
                    </div>
                </div>
                {/* our mission */}
                <div className="">
                    <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
                        alt=""
                        className="rounded-lg"
                    />
                </div>

                <div className="mt-20 max-w-2xl">
                    <h1 className="text-4xl font-bold">Our values</h1>
                    <p className="mt-10 dark:text-gray-400 ">
                        Lorem ipsum dolor sit amet consect adipisicing elit.
                        Possimus magnam voluptatum cupiditate veritatis in
                        accusamus quisquam.
                    </p>
                </div>

                {/* Trusted by */}
                <div className=" my-20  ">
                    <div className="text-center text-lg font-semibold ">
                        Trusted by the world's most innovative teams
                    </div>
                    <div className="mt-10 grid grid-cols-5 ">
                        {companyList.map((itemC) => (
                            <React.Fragment key={"Company-List_" + itemC.image}>
                                <img
                                    src={itemC.image}
                                    alt=""
                                    className="dark:fill-white"
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {/* our tem */}
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold">Our Team</h2>
                    <p className="mt-4 dark:text-gray-400 text-gray-600 text-base ">
                        Sit facilis neque ab nulla vel. Cum eos in laudantium.
                        Temporibus eos totam in dolorum. Nemo vel facere
                        repellendus ut eos dolores similique.
                    </p>
                </div>
                <div className="mt-20 grid grid-cols-6 gap-y-10 gap-x-5">
                    {ourTeamList.map((item) => (
                        <React.Fragment key={"OurTeam-List_" + item.name}>
                            <div className="flex flex-col">
                                <img
                                    src={item.image}
                                    className="h-24 w-24 mx-4  rounded-full"
                                    alt=""
                                />
                                <h2 className="mt-4 text-base font-semibold ">
                                    {item.name}
                                </h2>
                                <p className=" text-sm text-gray-600">
                                    {item.position}
                                </p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <div className=" py-32">
                    <div className="">
                        <div className="text-4xl font-bold">From the blog</div>
                        <div className="mt-2 dark:text-gray-400 text-base">
                            Learn how to grow your business with our expert
                            advice.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
