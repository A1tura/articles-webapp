import * as types from "../types/article.types";

export const removeExtraSpaces = (title: types.title): types.title => {
    return title.replace(/\s+/g,' ').trim();
}