"use server";

import { revalidatePath } from "next/cache";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactAction(formData: ContactFormData) {
  try {
    // Process contact / booking submission
    if (!formData.email) {
      return { success: false, message: "Email không được để trống" };
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    revalidatePath("/contact");
    return {
      success: true,
      message: "Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm nhất.",
    };
  } catch {
    return {
      success: false,
      message: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.",
    };
  }
}
