import { AsyncStorage } from "react-native"

export const verifyResponse = resp => (resp.ok ? resp : Promise.reject(resp))

export const handleError = error => error
// error.json().then(json => Promise.reject(json.message));
// console.log(error);

