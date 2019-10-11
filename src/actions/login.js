import {createAction} from 'redux-actions';

export const loginUserStarted = createAction('[Login] login user started');
export const loginUserCompleted = createAction('[Login] login user completed');
export const loginUserFailed = createAction('[Login] login user failed');
export const logoutUser = createAction('[Login] logout user');

export const authorization = (item) => (dispatch, getStates) => {
    dispatch(loginUserStarted());
    fetch(`http://${document.domain}:3000/auth`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((response) =>  response.json())
        .then((data) => {
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("token", data.token);
            dispatch(loginUserCompleted(data));
        })
        .catch((err) => {
            console.log(err)
            dispatch(loginUserFailed(err))
        });
};
export const getLoggedUser = ()  => (dispatch, getState) => {
    const token = localStorage.token;
    if (token) {
        return fetch(`http://${document.domain}:3000/auth`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                dispatch(loginUserCompleted(data))
            })
            .catch((err) => {
                localStorage.removeItem("token");
                dispatch(loginUserFailed(err))
            });
    }
}
export const reset = () => (dispatch, getStates) => {
    dispatch(logoutUser());
};