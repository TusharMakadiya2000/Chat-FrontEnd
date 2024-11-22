import EmojiPicker from "emoji-picker-react";

const Emoji = () => {
    return (
        <>
            <ul className="dropup-content absolute -top-1 right-0 -translate-y-full w-full">
                <EmojiPicker />
            </ul>
        </>
    );
};

export default Emoji;
