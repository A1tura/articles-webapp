import { Collection, ObjectId } from "mongodb";
import {db} from "../db/db";
import { article, articleContentDB, articleDB } from "../interfaces/article.interface";
import * as types from "../types/article.types"

const getCollection = (): Collection => db.collection("articles");
const getCollectionContent = (): Collection => db.collection("articles-content");

export const createArticle = async (article: article, text: string): Promise<void> => {
    const document = await getCollection().insertOne({...article});
    getCollectionContent().insertOne({articleId: document.insertedId, text});
}

export const getArticle = async (_id: ObjectId): Promise<articleDB | null> => {
    const document = await getCollection().findOne<articleDB>({_id});

    return document;
}

export const getArticleContent = async (_id: ObjectId): Promise<articleContentDB | null> => {
    const document = await getCollectionContent().findOne<articleContentDB>({_id});

    return document;
}