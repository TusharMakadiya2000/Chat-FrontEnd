import React, { Fragment,  } from "react";
import iconSet from "../components/utils/selection.json";
import Icon from "../components/utils/Icon";

const IconList: React.FC = () => {
    const icons = iconSet.icons as any;
    return (
        <Fragment>
                <div className="grid md:grid-cols-4 p-5 gap-4">
                    {icons.map((item: any) => (
                        <div key={"Icon_" + item.properties.name}>
                            <Icon
                                icon={item.properties.name}
                                className="h-5 w-5"
                            />{" "}
                            - {item.properties.name}
                        </div>
                    ))}
                </div>
        </Fragment>
    );
};

export default IconList;
