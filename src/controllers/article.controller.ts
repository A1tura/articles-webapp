import { Request, Response } from "express"
import { validateTitle } from "../validation/article.validation";

export const test = (req: Request, res: Response): Response => {
    return res.json({success: true});
}

export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    const {title, tags, category, text} = req.body;

    const validatedTitle = validateTitle(title);

    return res.json({success: true});
}