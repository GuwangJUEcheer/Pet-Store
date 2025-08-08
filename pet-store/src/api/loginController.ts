// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** login POST /api/login */
export async function loginUsingPost(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return request<API.LoginResponse>("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
