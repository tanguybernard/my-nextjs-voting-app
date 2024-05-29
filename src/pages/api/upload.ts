import type {NextApiRequest, NextApiResponse} from "next";
import {writeFile} from 'fs/promises'
import formidable from "formidable";
import * as fs from "fs";
//import { NextRequest, NextResponse } from 'next/server'

import csvParser from "csv-parser";
type Data = {
    data: any;
    error: string | null;
};

export const config = {
    api: {
        bodyParser: false,
    },
};



function parse(results, path:string){

    return fs.createReadStream(path)
        .pipe(csvParser())
        .on('data', (data) => results.push({
            id:data['Id'], name: data['Name']
        }))

}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            data: null,
            error: "Method Not Allowed",
        });
        return;
    }

    const form = formidable({});

    try {
        const [fields, files] = await form.parse(req);


        console.log(files)


        if (!files.file) {
            res.status(400).json({data:null, error: 'File upload error: No file was uploaded.'});
            return;
        }

        const [file] = files.file;
        const fileName = `${file.originalFilename}`;

        if (!file) {
            return res.status(400).json({
                data: null,
                error: 'File not found',
            });
        }


        const destinationPath = `/tmp/${fileName}`
        fs.rename(file.filepath, destinationPath, (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({data: null, error: 'Error moving the file.'});
                return;
            }


        });

        const results: {id:string, name:string}[] = [];

        parse(results, destinationPath)
            .on('end', () => {
                res.status(200).json({
                    data: results,
                    error: null,
                })
            })
            .on('error', (err) => {
                    res.status(500).json({ data:null, error: err.message });
                });







    } catch (err) {
        // example to check for a very specific error
        res.status(500).json({data: null, error: 'Error parsing the form data.'});
        return;
    }


    form.parse(req, async (err, _fields, files) => {


    });

}