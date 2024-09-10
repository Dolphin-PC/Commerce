/** 문자에서 숫자만 return */
export const convertStringToNumber = (value) => {
    if (value === undefined)
        return 0;
    if (value === "")
        return 0;
    return parseInt(value.replace(/[^0-9]/g, ""));
};
/** 숫자를 콤마가 포함된 문자열로 변환 */
export const toCommaString = (value) => {
    if (value === undefined)
        return "";
    if (value === "")
        return "";
    if (value.length < 3)
        return value;
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
