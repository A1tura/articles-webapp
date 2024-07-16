import * as types from "../types/article.types"
import { title } from "../types/tag.types";
import { removeExtraSpaces } from "../utils/articleFormatter";

export const validateTitle = (title: types.title): string[] => {
    const errors: string[] = [];

    if (title.length < 8) {
        errors.push("Article title must be at least 8 words.")
    } else if (title.length > 20) {
        errors.push("Article title cannot be more than 20 words.")
    }

    return errors;
}

export const validateTag = (title: title): string[] => {
    const errors: string[] = [];

    if (title.length < 2) {
        errors.push("Tag must be at least 2 symbols")
    } else if (title.length > 9) {
        errors.push("Tag cannot be more than 8 symbols.")
    }

    if (title.includes(" ")) {
        errors.push("Tag should be only 1 word.")
    }

    return errors;
}


export const validateText = (text: string): string[] => {
    const errors: string[] = [];

    if (text.split(" ").length < 300) {
        errors.push("Article content must be at least 300 words");
    } else if (text.split(" ").length > 10000) {
        errors.push("Article content cannot be more than 10,000 words.");
    }

    return errors;
}

export const validateCategory = (category: types.category): string[] => {
    const errors: string[] = [];

        if (category.length < 2) {
            errors.push("Category title must be at least 2 symbols.")
        } else if (category.length > 30) {
            errors.push("Category title  cannot be more than 30 symbols.");
        }

    return errors;
}