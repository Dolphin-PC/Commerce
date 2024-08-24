import { SignUpSchema } from "./auth.zod";

describe("회원가입 스키마 | SignUpSchema ", () => {
  it("회원가입 성공", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "Test1234!@",
      confirmPassword: "Test1234!@",
      isSeller: false,
    });

    expect(test.success).toBeTruthy();
  });

  it("회원가입 실패 - 이메일 형식이 아닌 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test",
      nickname: "test",
      password: "Test1234!@",
      confirmPassword: "Test1234!@",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });

  it("회원가입 실패 - 비밀번호가 연속된 키보드 문자열의 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "QWERTY",
      confirmPassword: "QWERTY",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });

  it("회원가입 실패 - 비밀번호가 영어 대소문자로만 이루어진 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "Password",
      confirmPassword: "Password",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });

  it("회원가입 실패 - 비밀번호가 10자리 이하인 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "short",
      confirmPassword: "short",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });

  it("회원가입 실패 - 비밀번호 confirm이 일치하지 않은 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "Test1234!@",
      confirmPassword: "Mismatch1234!@",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });

  it("회원가입 실패 - 비밀번호에 이메일 아이디가 포함된 경우", () => {
    const test = SignUpSchema.safeParse({
      email: "test@gmail.com",
      nickname: "test",
      password: "test1dsadwq!@",
      confirmPassword: "test1dsadwq!@",
      isSeller: false,
    });

    expect(test.success).toBeFalsy();
  });
});
