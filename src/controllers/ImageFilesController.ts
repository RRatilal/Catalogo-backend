import { Request, Response } from "express";
import { getRepository } from "typeorm";

import ImageFiles from "../models/ImageFile";

interface IPagination {
    page: number,
    perPage: number
}

export default {
    async show(req:Request, res: Response) {
        let { perPage, page } = <IPagination><unknown>req.query;
        let realPage: number;
        let realTake: number;

        if (perPage) realTake = +perPage
        else {
            perPage = 5
            realTake = 5
        }

        if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
        else {
            realPage = 0;
            page = 1
        }

        const ImageFilesRepository = getRepository(ImageFiles);

        const allImage = {
            data: await ImageFilesRepository.find({
                skip: realPage,
                take: realTake
            }),
            perPage: realTake,
            page: +page || 1,
            next: `${process.env.APP_URL}/uploads?page=${realTake}&perPage=${+page + 1}`,
            prev: `${process.env.APP_URL}/uploads?page=${realTake}&perPage=${+page - 1}`
        }

        return res.json(allImage);
    },

    async create(req:Request, res: Response) {
        const { description } = req.body;
        const requestImage = req.file;

        const name = requestImage.originalname
        const url = `${process.env.APP_URL}/uploads/${requestImage.filename}`;

        const ImageFilesRepository = getRepository(ImageFiles);

        const ImageFile = ImageFilesRepository.create({
            name,
            url,
            description
        });

        await ImageFilesRepository.save(ImageFile);

        return res.json(ImageFile);
    }
}