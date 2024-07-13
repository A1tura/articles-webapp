import { Collection, ObjectId } from "mongodb";
import {db} from "../db/db";
import { Category, CategoryDB } from "../interfaces/category.interface";
import * as types from "../types/category.types";

const getCollection = (): Collection => db.collection("category");

export const createCategory = async (category: Category): Promise<void> => {
    getCollection().insertOne({...category});
}

export const getCategory = async (data: types.title | ObjectId): Promise<CategoryDB | null> => {
    const document = await getCollection().findOne<CategoryDB>({data});

    return document;
}

export const useCategory = async (_id: ObjectId): Promise<void> => {
    const category = await getCategory(_id);

    if (category) {
        getCollection().updateOne({_id}, {$set: {articles: category.articles + 1}})
    }
}