import { httpPost } from "../utils/http-request";
import { UserAnswers } from "./model";
const crypto = require('crypto');

const questions = require('../../assets/questions.json');

function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0")
}

function generateId(len) {
    var arr = crypto.randomBytes(len);
    return Array.from(arr, dec2hex).join('')
}

export function questionsGet(): any[] {
    return questions;
}

export const getResults = async (id: any) => {
    await UserAnswers.sync();

    const data = await UserAnswers.findOne({
        where: {
            id: id
        }
    });
    
    if (data && data.answers) {
        return {
            ...JSON.parse(data.answers),
            id: data.id
        }
    }

    return undefined;
}

export const submitQuestions = async (respondentData) => {
    const newId = generateId(36);
    const result: any = await httpPost({
        hostname: process.env.SURVEY_URL,
        port: process.env.SURVEY_PORT,
        path: '/questionnaire'
    }, { id: newId, Name: newId, ...respondentData});

    if (result.error) {
        return result;
    }

    await UserAnswers.sync();

    await UserAnswers.create({
        id: newId,
        answers: JSON.stringify(result)
    });

    return {
        ...(result as any),
        id: newId,
    };
}
