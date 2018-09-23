import { AsyncStorage } from 'react-native';

export class Storage {

    /** Set user info */
    setUserData = (key, data) => {
        AsyncStorage.setItem(key, JSON.stringify(data));
    }

    /** Get user info */
    async getUserInfo(key) {
        const result = await AsyncStorage.getItem(key);

        return result;
    }

    /** Remove user info */
    async removeItem(key, data) {
        return await AsyncStorage.removeItem(key);
    }
}