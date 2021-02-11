"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ImageFile_1 = __importDefault(require("../models/ImageFile"));
exports.default = {
    async show(req, res) {
        let { perPage, page } = req.query;
        let realPage;
        let realTake;
        if (perPage)
            realTake = +perPage;
        else {
            perPage = 5;
            realTake = 5;
        }
        if (page)
            realPage = +page === 1 ? 0 : (+page - 1) * realTake;
        else {
            realPage = 0;
            page = 1;
        }
        const ImageFilesRepository = typeorm_1.getRepository(ImageFile_1.default);
        const allImage = {
            data: await ImageFilesRepository.find({
                skip: realPage,
                take: realTake
            }),
            perPage: realTake,
            page: +page || 1,
            next: `${process.env.APP_URL}/uploads?page=${realTake}&perPage=${+page + 1}`,
            prev: `${process.env.APP_URL}/uploads?page=${realTake}&perPage=${+page - 1}`
        };
        return res.json(allImage);
    },
    async create(req, res) {
        const { description } = req.body;
        const requestImage = req.file;
        const name = requestImage.originalname;
        const url = `${process.env.APP_URL}/uploads/${requestImage.filename}`;
        const ImageFilesRepository = typeorm_1.getRepository(ImageFile_1.default);
        const ImageFile = ImageFilesRepository.create({
            name,
            url,
            description
        });
        await ImageFilesRepository.save(ImageFile);
        return res.json(ImageFile);
    }
};
