import { z } from "zod";

export const isPhoneNumber = (phone: string) => {
  const NUMBER_REGX = /^\d*$/;

  return (
    NUMBER_REGX.test(phone) &&
    phone.length === 10 &&
    phone[0] === "0" &&
    phone[1] === "9"
  );
};

export const phoneRules = z
  .string()
  .nonempty("手機號碼不得為空")
  .refine((data) => isPhoneNumber(data), {
    message: "手機號碼格式錯誤",
  });

export const passwordRules = z.string().nonempty("密碼不得為空");

export const countryCodeRules = z.string().nonempty("國碼不得為空");

export const companyCodeRules = z.string().nonempty("組織編號不得為空");

export const policyRules = z.boolean().refine((value) => value, {
  message: "請同意會員條款規範",
});

export const verificationCodeRules = z.string().nonempty("驗證碼不得為空");

export const emailRules = z
  .string()
  .nonempty("email 不得為空")
  .email("請輸入正確的 Email 格式");

export const nameRules = z.string().nonempty("姓名不得為空");

export const passwordConfirmRules = z.string().nonempty("確認密碼不得為空");
