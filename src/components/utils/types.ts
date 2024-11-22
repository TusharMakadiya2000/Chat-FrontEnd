export type FilesExtType = {
    [key: string]: Array<string>;
};
export type AllowedFilesType = {
    [key: string]: Array<string>;
};
export type FilesSizeType = {
    [key: string]: number;
};

export type ModalSizeType = {
    [key: string]: string;
};

export interface IFile {
    id: number;
    filename: string;
    size: string;
}
export interface IImage {
    id: number;
    filename: string;
}
export interface IChat {
    _id: number;
    sender: {
        _id: number;
        name: string;
        email: string;
    };
    receiver: {
        _id: number;
        name: string;
        email: string;
    };
    parentid?: number;
    messageType: string;
    deliverType: string;
    type: string;
    message: string;
    createdAt: string;
    updatedAt?: string;
    images?: IImage[];
    docname1?: string;
    docicon?: string;
    docname2?: string;
    docname3?: string;
    imagename?: string;
    files: IFile[];
}
export interface userItemType {
    _id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    lastMessage: string;
    profileImage: string;
    icon: string;
    msg?: number;
    read?: boolean;
    status: string;
    favorite: boolean;
    blocked: boolean;
    coverImage: string;
    archive: boolean;
    chat: IChat[];
}

export interface userItemType2 {
    name: string;
    id: string;
}

export interface BroadCastType {
    _id: number;
    name: string;
    participants: string;
    broadcastImage: string;
    coverImage: string;
    archive: boolean;
    chat: IChat[];
    users: BroadCastUserList[];
}
export interface BroadCastUserList {
    id: number;
    name: string;
    image: string;
    role: string;
    lastMessage: string;
    createdOn: string;
    status: string;
}
export interface GroupType {
    _id: number;
    name: string;
    participants: string;
    groupImage: string;
    cover: string;
    archive: boolean;
    chat: IChat[];
    users: GroupNameList[];
}

export interface GroupNameList {
    id: number;
    name: string;
    image: string;
    role: string;
    lastMessage: string;
    createdOn: string;
    status: string;
}
export interface ICall {
    id: number;
    name: string;
    lastCall: string;
    image: string;
    icon: string;
    timing: string;
    status: string;
}
export interface CallUserList {
    id: number;
    name: string;
    lastCall: string;
    profileImage: string;
    icon: string;
    status: string;
    mobileNumber: number;
    call: ICall[];
}
