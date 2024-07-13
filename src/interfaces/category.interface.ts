import { ObjectId } from "mongodb";
import * as types from "../types/category.types"

export interface Category {
    title: types.title;
    description: types.description;
    articles: types.articles;
    likes: types.likes;
}

export interface CategoryDB extends Category {
    _id: ObjectId;
}