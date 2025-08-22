// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** submitVisitApplication POST /visit/apply */
export async function submitVisitApplicationUsingPost(
  body: API.VisitApplicationRequest,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("visit/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}