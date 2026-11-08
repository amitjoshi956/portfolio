import {
  HttpMethod,
  HttpStatus,
  HttpHeader,
  ContentType,
} from "../constants/http.const";

export type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];
export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];
export type HttpHeaderType = (typeof HttpHeader)[keyof typeof HttpHeader];
export type ContentTypeValue = (typeof ContentType)[keyof typeof ContentType];
