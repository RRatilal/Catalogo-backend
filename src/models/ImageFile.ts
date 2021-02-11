import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity('imageFiles')
export default class ImageFiles {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    url!: string;

    @Column()
    description!: string;
}