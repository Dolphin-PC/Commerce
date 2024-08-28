/** 숫자를 문자열숫자로 변환 */
export const convertStringToNumber = (value: string): string => {
  if (value === undefined) return "";
  if (value === "") return "";

  return parseInt(value.replace(/[^0-9]/g, "")).toString();
};

/** 숫자를 콤마가 포함된 문자열로 변환 */
export const toCommaString = (value: string): string => {
  if (value === undefined) return "";
  if (value === "") return "";
  if (value.length < 3) return value;

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
