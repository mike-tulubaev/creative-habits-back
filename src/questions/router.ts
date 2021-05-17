import { Router, NextFunction, Response, Request } from "express";
import { getResults, questionsGet, submitQuestions } from "./module";
import { APIError } from "../utils/custom-error";
import { createPdf } from "./pdf";
const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send(questionsGet());
    } catch (error) {
        next(new APIError(error.message));
    }
});

router.get("/download/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const answers = await getResults(req.params.id);
        const pdf = await createPdf(answers);

        res.contentType('application/pdf').send(pdf);
    } catch (error) {
        console.error(error);
        next(new APIError(error.message));
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const answers = await getResults(req.params.id);

        res.status(200).send(answers);
    } catch (error) {
        next(new APIError(error.message));
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionsResult = await submitQuestions(req.body);
        if (questionsResult.error) {
            res.status(400).send(questionsResult);
        } else {
            res.status(200).send(questionsResult);
        }
    } catch (error) {
        next(new APIError(error.message));
    }
});

export = router;