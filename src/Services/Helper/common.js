import AsyncStorage from "@react-native-async-storage/async-storage";
export const _setCache = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

export const _getCache = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    }
    catch (error) {
        console.log(error);  
    }
};
export const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const onlyNumber = (str) => {
    return /^\d+$/.test(str);
}