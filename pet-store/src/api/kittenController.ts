// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** addKitten POST /add */
export async function addKittenUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addKittenUsingPOSTParams,
  body: {},
  img?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (img) {
    formData.append("img", img);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<Record<string, any>>("add", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    
    ...(options || {}),
  });
}

/** changeKittenPhoto POST /change/photo */
export async function changeKittenPhotoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeKittenPhotoUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<string>("change/photo", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    
    ...(options || {}),
  });
}

/** getKittenById GET /get/${param0} */
export async function getKittenByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKittenByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`get/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteKitten DELETE /kittens/${param0} */
export async function deleteKittenUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteKittenUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`kittens/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteParentImage DELETE /kittens/parents/${param0}/delete */
export async function deleteParentImageUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteParentImageUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(
    `kittens/parents/${param0}/delete`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** getPublicKittens GET /list */
export async function getPublicKittensUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params?: API.getPublicKittensUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("list", {
    method: "GET",
    params: {
      // page has a default value: 1
      page: "1",
      // size has a default value: 8
      size: "8",
      ...params,
    },
    ...(options || {}),
  });
}

/** markKittenAsSold POST /mark-as-sold/${param0} */
export async function markKittenAsSoldUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.markKittenAsSoldUsingPOSTParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`mark-as-sold/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getKittenParents GET /parents */
export async function getKittenParentsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKittenParentsUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("parents", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getPastKittens GET /past */
export async function getPastKittensUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPastKittensUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("past", {
    method: "GET",
    params: {
      // page has a default value: 1
      page: "1",
      // size has a default value: 5
      size: "5",
      ...params,
    },
    ...(options || {}),
  });
}

/** updateKitten POST /updateKitten */
export async function updateKittenUsingPost(
  body: API.UpdateKittenRequest,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("updateKitten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
