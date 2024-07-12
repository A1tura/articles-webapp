import * as types from "../types/article.types"
import { formatTitle } from "../utils/articleFormatter";

export const validateTitle = (title: types.title): string[] => {
    const errors: string[] = [];

    if (title.length < 8) {
        errors.push("Article title must be at least 8 words.")
    } else if (title.length > 20) {
        errors.push("Article title cannot be more than 20 words.")
    }

    return errors;
}