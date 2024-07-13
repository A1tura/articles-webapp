import { Collection, ObjectId } from "mongodb";
import {db} from "../db/db";
import { Tag, TagDB } from "../interfaces/tag.interface";
import { title } from "../types/tag.types";
 
const getCollection = (): Collection => db.collection("tags");

export const createTag = async (tag: Tag): Promise<void> => {
    const document = await getCollection().insertOne({...tag});
}

export const getTag = async (data: title | ObjectId): Promise<TagDB | null> => {


    const document = await getCollection().findOne<TagDB>({data});


    return document;
}

export const useTag = async (_id: ObjectId): Promise<void> => {
    const tag = await getTag(_id);

    if (tag) {
        getCollection().updateOne({_id}, {$set: {articles: tag?.articles + 1}})
    }
}