import type { NextPage } from "next";
import Head from "next/head";
import {ChangeEvent, useState} from "react";



const Import: NextPage = () => {

    const [file, setFile] = useState<File | null>(null);


    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (!fileInput.files) {
            alert("No file was chosen");
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Files list is empty");
            return;
        }

        const file = fileInput.files[0];
console.log(file.type)
        /** File validation */
        /*if (!file.type.startsWith("image")) {
            alert("Please select a valide image");
            return;
        }*/

        /** Setting file state */
        setFile(file); // we will use the file state, to send it later to the server

        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
    };

    const onUploadFile = async (e: any) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        try {
            let formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const {
                data,
                error,
            }: {
                data: {
                    url: string | string[];
                } | null;
                error: string | null;
            } = await res.json();

            if (error || !data) {
                alert(error || "Sorry! something went wrong.");
                return;
            }

            console.log("File was uploaded successfylly:", data);
        } catch (error) {
            console.error(error);
            alert("Sorry! something went wrong.");
        }
    };



    return (
        <div>
            <Head>
                <title>File uploader</title>
                <meta name="description" content="File uploader" />
            </Head>

            <main>
                <h1>Upload your files</h1>

                <form action="">
                    <input name="file" type="file" onChange={onFileUploadChange}/>
                </form>
                <button
                    onClick={onUploadFile}
                >
                    Upload file
                </button>
            </main>

            <footer>
                <p>All right reserved</p>
            </footer>
        </div>
    );
};

export default Import;