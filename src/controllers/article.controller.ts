import { Request, Response } from "express"
import { validateTag, validateText, validateTitle } from "../validation/article.validation";
import { articleErrors } from "../interfaces/validation.interface";
import { createTag, getTag } from "../dal/tags.dal";
import { Article } from "../interfaces/article.interface";
import { removeExtraSpaces } from "../utils/articleFormatter";
import { getCategory } from "../dal/category.dal";

export const test = (req: Request, res: Response): Response => {
    return res.json({success: true});
}

export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    let {title, tags, category, text} = req.body;

    if (!title || !category || !text) {
        return res.json({success: false});
    }

    title = removeExtraSpaces(title);
    text = removeExtraSpaces(text)

    const article: Article = {
        title,
        likes: 0,
        tags,
        category
    }

    const errors: articleErrors = {};

    const validatedTitle = validateTitle(title);
    const validatedText = validateText(text);

    const categoryDB = await getCategory(category);

    console.log(categoryDB)

    if (tags != undefined) {
        for (let i = 0; i < tags.length; i++) {
            const tag = await getTag(tags[i]);
    
            if (tag === null) {
                const validatedTag = validateTag(tags[i]);
    
                if (validatedTag.length > 0) {
                    if (!errors.tags) {
                        errors.tags = {};
                        errors.tags[tags[i]] = validatedTag;
                    } else {
                        errors.tags[tags[i]] = validatedTag;
                    }
                } else {
                    createTag({title: tags[i], articles: 0});
                }
            }
        }
    }


    if (categoryDB === null) {
        if (!errors.category) {
            errors.category = ["Category do not exist."];
        } else {
            errors.category.push("Category do not exist.");
        }
    }


    
    if (Object.keys(errors).length > 0) {
        return res.json({success: false, fields: Object.keys(errors), errors});
    } else {
        return res.json({success: true});
    }
}