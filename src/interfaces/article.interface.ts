import { ObjectId } from "mongodb";
import * as types from "../types/article.types";

export interface article {
    title: types.title;
    likes: types.likes;
    tag: types.tag;
    category: types.category;
}

export interface articleDB extends article {
    _id: ObjectId;
}