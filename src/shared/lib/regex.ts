// 문자+숫자+특수문자 3가지 조합
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])/;

// 키보드 상에 나란히 있는 문자열 포함 X
export const PASSWORD_KEYBOARD_REGEX = /^(?!.*[1234567890])|(?![qwertyuiop])|(?![asdfghjkl])|(?![zxcvbnm])|(?![QWERTYUIOP])|(?![ASDFGHJKL])|(?![ZXCVBNM])|(?![!@#$%^&*()_+])/;

// 한글 제외
export const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
