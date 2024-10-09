import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const CustomAvatar = ({ fallbackText }: { fallbackText: string }) => {
    // Ensure fallback text is limited to 2 characters
    const truncatedFallbackText = fallbackText.slice(0, 2);

    return (
        <Avatar className="flex items-center justify-center w-7 h-7 ">
            <AvatarFallback className="bg-white">{truncatedFallbackText}</AvatarFallback>
        </Avatar>
    );
}

export default CustomAvatar;
