import type { ContactPayload, ContactResponse } from "@common/types/chat.type";
import { ApiClient } from "../client";
import { Endpoints, HttpMethod } from "@common/constants";

export const ContactService = {
  submitContactRequest: async (
    payload: ContactPayload,
  ): Promise<ContactResponse> => {
    return ApiClient<ContactResponse>(Endpoints.CONTACT_REQUEST, {
      method: HttpMethod.POST,
      body: JSON.stringify(payload),
    });
  },
};
