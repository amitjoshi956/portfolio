import { apiClient } from "../client";
import { AppConfig } from "@config/constants";
import { HttpMethod } from "@common/constants";

export interface ContactPayload {
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

export const contactService = {
  submitContactRequest: async (payload: ContactPayload): Promise<ContactResponse> => {
    return apiClient<ContactResponse>(AppConfig.api.endpoints.contactRequest, {
      method: HttpMethod.POST,
      body: JSON.stringify(payload),
    });
  },
};
