"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface FileManagerProps {
    onFileSelected: (image: string) => void;
}

export const FileManagerOpener: React.FC<FileManagerProps> = ({ onFileSelected }) => {
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                import("@flmngr/flmngr-react").then((fileManager) => {
                    fileManager.default.load({
                        apiKey: "SQy1bQvm",
                        urlFileManager: `https://filemanager-e-recruitment.teinsolutions.com/flmngr`,
                        urlFiles: `https://filemanager-e-recruitment.teinsolutions.com/files`,
                    });
                });
            }
        } catch (error: any) {
            toast({
                title: error.message
            });
            console.log(error)
        }
    }, []);

    const openFileManager = () => {
        try {
            if (typeof window !== "undefined") {
                import("@flmngr/flmngr-react").then((fileManager) => {
                    fileManager.default.open({
                        isMultiple: false,
                        apiKey: 'SQy1bQvm',
                        urlFileManager: 'https://filemanager-e-recruitment.teinsolutions.com/flmngr',
                        urlFiles: "https://filemanager-e-recruitment.teinsolutions.com/files",
                        acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp", "mp4", "svg", "pdf", "docx"],
                        onFinish: (files: any) => {
                            const media = files[0]?.url || "";
                            if (media) {
                                const mediaUrl = new URL(media).pathname;
                                console.log("file image url", mediaUrl);
                                onFileSelected(mediaUrl);
                            }
                        },
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full">
            {typeof window !== "undefined" && (
                <div
                    className="w-full h-full text-center px-4 py-4 flex items-center justify-center cursor-pointer"
                    onClick={openFileManager}>
                    <Button type="button" variant="outline" className="text-black dark:text-white font-bold">
                        Buka File Manager
                    </Button>
                </div>
            )}
        </div>
    );
};