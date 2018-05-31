
export const FETCH_ERROR = 'FETCH_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCH_START = 'FETCH_START'

export const fetchStart = () => ({
    type: FETCH_START
})

export const fetchError = e => ({
    type: FETCH_ERROR,
    data: e
})

export const clearError = () => ({
    type: CLEAR_ERROR
})