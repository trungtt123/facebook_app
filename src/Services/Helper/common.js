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

export const getTimeUpdatePostFromUnixTime = (unix) => {
    const today = new Date();
    const before = today.getTime()/1000 - unix;
    const d = new Date(unix * 1000);
    if (0 <= before && before <= 59) return `${before} giây`;
    if (60 <= before && before <= 60 * 60 - 1) return `${Math.floor(before / 60)} phút`;
    if (60 * 60 <= before && before <= 24 * 60 * 60 - 1) return `${Math.floor(before / 3600)} giờ`;
    if (24 * 60 * 60 <= before && before <= 5 * 24 * 60 * 60 - 1) return `${Math.floor(before / 86400)} ngày`;
    let datestring = ("0" + d.getDate()).slice(-2) + " thg " + ("0" + (d.getMonth() + 1)).slice(-2) + `${d.getFullYear !== today.getFullYear ? ", " +
        d.getFullYear() : ""}`;
    return datestring;
}