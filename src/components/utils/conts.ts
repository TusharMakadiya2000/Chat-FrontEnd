import { FilesExtType, AllowedFilesType, FilesSizeType } from "./types";

export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(" ");
}

export const filesExt: FilesExtType = {
    image: ["jpg", "jpeg", "png"],
    video: ["mp4", "3gpp", "3gp"],
    document: ["pdf"],
    csv: ["csv"],
    sheet: ["xlsx", "xls", "csv"],
};
export const allowedFiles: AllowedFilesType = {
    image: ["image/jpg,image/jpeg,image/png"],
    video: ["video/mp4,video/3gpp,video/3gp"],
    document: [".pdf"],
    sheet: [".xlsx", ".xls", ".csv"],
};
export const filesSize: FilesSizeType = {
    image: 2000000,
    video: 10000000,
    document: 5000000,
    sheet: 2000000,
};
