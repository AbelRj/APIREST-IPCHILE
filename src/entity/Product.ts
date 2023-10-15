import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, Unique, UpdateDateColumn } from "typeorm";



@Entity()
@Unique(['name'])
export class Product {
    @ObjectIdColumn()
    id:ObjectId;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}