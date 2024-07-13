import { ObjectId } from "mongodb";
import * as types from "../types/article.types";

export interface Article {
    title: types.title;
    likes: types.likes;
    tags: types.tag[];
    category: types.category;
}

export interface ArticleDB extends Article {
    _id: ObjectId;
}

export interface ArticleContent {
    text: string;
}

export interface ArticleContentDB extends ArticleContent {
    _id: ObjectId;
}