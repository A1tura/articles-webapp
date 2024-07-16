import { Collection, ObjectId } from "mongodb";
import {db} from "../db/db";
import { Category, CategoryDB } from "../interfaces/category.interface";
import * as types from "../types/category.types";

const getCollection = (): Collection => db.collection("category");

export const createCategory = async (category: Category): Promise<void> => {
    getCollection().insertOne({...category});
}

export const getCategoryByTitle = async (title: types.title): Promise<CategoryDB | null> => {
    const document = await getCollection().findOne<CategoryDB>({title});

    return document;
}

export const getCategoryById = async (_id: ObjectId): Promise<CategoryDB | null> => {
    const document = await getCollection().findOne<CategoryDB>({_id});

    return document;
}


export const useCategory = async (_id: ObjectId): Promise<void> => {
    const category = await getCategoryById(_id);

    if (category) {
        getCollection().updateOne({_id}, {$set: {articles: category.articles + 1}})
    }
}

export const getAllCategories = async (): Promise<CategoryDB[] | null> => {
    const document = await getCollection().find<CategoryDB>({}).toArray();

    return document;
}