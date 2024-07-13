import { ObjectId } from "mongodb";
import * as types from "../types/tag.types"

export interface Tag {
    title: types.title;
    articles: types.articles;
}

export interface TagDB extends Tag {
    _id: ObjectId;
}