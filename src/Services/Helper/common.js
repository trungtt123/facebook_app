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
    if (0 <= before && before <= 59) return `Vừa xong`;
    if (60 <= before && before <= 60 * 60 - 1) return `${Math.floor(before / 60)} phút`;
    if (60 * 60 <= before && before <= 24 * 60 * 60 - 1) return `${Math.floor(before / 3600)} giờ`;
    if (24 * 60 * 60 <= before && before <= 7 * 24 * 60 * 60 - 1) return `${Math.floor(before / 86400)} ngày`;
    let datestring = ("0" + d.getDate()).slice(-2) + " thg " + ("0" + (d.getMonth() + 1)).slice(-2) + `${d.getFullYear !== today.getFullYear ? ", " +
        d.getFullYear() : ""}`;
    return datestring;
}
export const getTimeUpdateDetailPostFromUnixTime = (unix) => {
    const today = new Date();
    const d = new Date(unix * 1000);
    let datestring = ("0" + d.getDate()).slice(-2) + " THG " + ("0" + (d.getMonth() + 1)).slice(-2) + `${d.getFullYear !== today.getFullYear ? ", " +
        d.getFullYear() : ""} LÚC ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    return datestring;
}
export const checkNamNhuan = (year) => {
    if (year % 100 === 0){
        return year % 400 === 0;
    }
    return year % 4 === 0;
}
export const getAge = (birthday)  => 
{
    var today = new Date();
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) 
    {
        age--;
    }
    return age;
}
export const converNumberLikeAndComment = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
     return num;
}