import { Response, Request } from "express";
import { removeExtraSpaces } from "../utils/articleFormatter";
import { getCategoryByTitle, createCategory as createCategoryDB, getAllCategories } from "../dal/category.dal";
import { categoryErrors } from "../interfaces/validation.interface";
import { Category } from "../interfaces/category.interface";
import { getArticlesByCatrgory } from "../dal/articles.dal";
import { validateCategory } from "../validation/article.validation";

export const test = (req: Request, res: Response): Response => {
    return res.json({success: true});
}

export const createCategory = async (req: Request, res: Response): Promise<Response> => {

    const errors: categoryErrors = {};
    const reqs = ["title", "description"];
    let {title, description} = req.body;

    for (let i = 0; i < reqs.length; i++) {
        if (req.body[reqs[i]] === undefined) {
            if (!errors.fields) {
                errors.fields = [`Field ${reqs[i]} cannoot be empty`];
            } else {
                errors.fields?.push(`Field ${reqs[i]} cannoot be empty`);
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.json({success: false, fields: Object.keys(errors), errors: errors});
    }

    title = removeExtraSpaces(title);

    const category: Category = {
        title,
        description,
        likes: 0,
        articles: 0,
    }


    const categoryDB = await getCategoryByTitle(title);

    const categoryValidationErrors = validateCategory(title);

    if (categoryValidationErrors.length > 0) {
        for (let i = 0; i < categoryValidationErrors.length; i++) {
            const error = categoryValidationErrors[i];

            if (!errors.title) {
                errors.title = [error];
            } else {
                errors.title.push(error);
            }
        }
    }

    if (categoryDB) {
        if (!errors.title) {
            errors.title = ["Category with the same name already exist."];
        } else {
            errors.title?.push("Category with the same name already exist.");
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.json({success: false, fields: Object.keys(errors), errors: errors});
    } else {

        createCategoryDB(category);

        return res.json({success: true});
    }
}

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    
    return res.json({success: true, result: await getAllCategories() });

}

export const getCategoryArticles = (req: Request, res: Response): Response => {

    const errors: {category?: string[]} = {};

    const {category} = req.params;

    const articles = getArticlesByCatrgory(category);

    if (Object.keys(errors).length > 0) {
        return res.json({success: false, fields: Object.keys(errors), errors: errors});
    } else {
        return res.json({success: true, result: articles});
    }

}