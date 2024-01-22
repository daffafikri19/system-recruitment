"use client"
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface textEditorProps {
    handleEditorChange?: (content : any, editor: any) => void
    initialValue?: string
    readonly?: boolean
}

export const TextEditor = ({ handleEditorChange, initialValue, readonly } : textEditorProps) => {
    return (
        <Editor
            initialValue={initialValue}
            apiKey={process.env.TINYMCE_API_KEY}
            init={{
                plugins:
                    "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                imagetools_cors_hosts: ["picsum.photos"],
                menubar: "file edit view insert format tools table help",
                toolbar:
                    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                body_class: 'dark:bg-boxdark',
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                readonly: readonly,
                // link_list: [
                //     { title: "My page 1", value: "http://www.tinymce.com" },
                //     { title: "My page 2", value: "http://www.moxiecode.com" }
                // ],
                // image_list: [
                //     { title: "My page 1", value: "http://www.tinymce.com" },
                //     { title: "My page 2", value: "http://www.moxiecode.com" }
                // ],
                // image_class_list: [
                //     { title: "None", value: "" },
                //     { title: "Some class", value: "class-name" }
                // ],
                importcss_append: true,
                file_picker_callback: function (callback, value, meta) {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === "file") {
                        callback("https://www.google.com/logos/google.jpg", {
                            text: "My text"
                        });
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === "image") {
                        callback("https://www.google.com/logos/google.jpg", {
                            alt: "My alt text"
                        });
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === "media") {
                        callback("movie.mp4", {
                            source2: "alt.ogg",
                            poster: "https://www.google.com/logos/google.jpg"
                        });
                    }
                },
                template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                min_height: 300,
                height: 500,
                max_height: 800,
                image_caption: true,
                quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                noneditable_noneditable_class: "mceNonEditable",
                toolbar_mode: "sliding",
                contextmenu: "link image imagetools table",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={handleEditorChange}
        />

    )
}