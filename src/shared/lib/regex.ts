// 소문자+대문자+숫자+특수문자 중 3가지 이상 조합
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/;

// 키보드 상에 나란히 있는 문자열 포함 X
export const PASSWORD_KEYBOARD_REGEX =
  /^(?!.*[1234567890])|(?![qwertyuiop])|(?![asdfghjkl])|(?![zxcvbnm])|(?![QWERTYUIOP])|(?![ASDFGHJKL])|(?![ZXCVBNM])|(?![!@#$%^&*()_+])/;

// 한글 제외
export const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
