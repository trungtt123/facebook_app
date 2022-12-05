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
export const _removeItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    }
    catch (error) {
        console.log(error);
    }
}
export const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const onlyNumber = (str) => {
    return /^\d+$/.test(str);
}
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const unixTimeConvert = (unix, format) => {
    const d = new Date(unix * 1000);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + ", " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring;
}