import { Collection, ObjectId } from "mongodb";
import {db} from "../db/db";
import { Article, ArticleContentDB, ArticleDB } from "../interfaces/article.interface";
import * as types from "../types/article.types"
import { useTag } from "./tags.dal";

const getCollection = (): Collection => db.collection("articles");
const getCollectionContent = (): Collection => db.collection("articles-content");

export const createArticle = async (article: Article, text: string): Promise<void> => {
    const document = await getCollection().insertOne({...article});

    for (let i = 0; article.tags; i++) {
        useTag(document.insertedId);
    }

    getCollectionContent().insertOne({articleId: document.insertedId, text});
}

export const getArticle = async (_id: ObjectId): Promise<ArticleDB | null> => {
    const document = await getCollection().findOne<ArticleDB>({_id});

    return document;
}

export const getArticleContent = async (_id: ObjectId): Promise<ArticleContentDB | null> => {
    const document = await getCollectionContent().findOne<ArticleContentDB>({_id});

    return document;
}