"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageFiles1612716290274 = void 0;
const typeorm_1 = require("typeorm");
class createImageFiles1612716290274 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "imageFiles",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'url',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('imageFiles');
    }
}
exports.createImageFiles1612716290274 = createImageFiles1612716290274;
