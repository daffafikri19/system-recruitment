"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { create } from "zustand"
import { CheckCircle2, EditIcon, UploadIcon } from "lucide-react";

interface FileManagerProps {
    onFileSelected: (file: any) => void;
    username: string
    filename: string
    onClick?: () => void
}

export const FileManagerUploader = ({ onFileSelected, username, filename }: FileManagerProps) => {

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

    const uploadFiles = () => {
        try {
            if (typeof window !== "undefined") {
                import("@flmngr/flmngr-react").then((fileManager) => {
                    fileManager.default.selectFiles({
                        acceptExtensions: ["pdf"],
                        isMultiple: false,
                        onFinish: (file: any) => {
                            fileManager.default.upload({
                                filesOrLinks: file,
                                dirUploads: `/user/${username}/${filename}`,
                                onFinish: (file: any) => {
                                    const doc = file[0]?.url || "";
                                    if (doc) {
                                        const docUrl = new URL(doc).pathname;
                                        onFileSelected(docUrl);
                                    }
                                },
                            })
                        },
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button className="w-full" variant={"outline"} onClick={uploadFiles}>
            Upload file <UploadIcon className="w-4 h-4 ml-2" />
        </Button>
    )
};