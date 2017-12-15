export const getQuestions = () => {
    return {
        type: 'GET_QUESTIONS',
        payload: null
    }
};

export const setCurrent = (currentQuestion) => {
    return {
        type: 'SET_CURRENT',
        payload: currentQuestion
    }
};

export const setLanguage = (languageIndex) => {
    return {
        type: 'SET_LANGUAGE',
        payload: languageIndex
    }
};