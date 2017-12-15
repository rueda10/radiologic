export const getQuestions = () => {
    return {
        type: 'GET_QUESTIONS',
        payload: null
    }
}

export const setCurrent = (currentQuestion) => {
    return {
        type: 'SET_CURRENT',
        payload: currentQuestion
    }
}