// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** getParentById GET parents/${param0} */
export async function getParentByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParentByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Parent>(`parents/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteParent DELETE parents/${param0} */
export async function deleteParentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteParentUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`parents/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** addParent POST parents/add */
export async function addParentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addParentUsingPOSTParams,
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

  return request<string>("parents/add", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    
    ...(options || {}),
  });
}

/** assignParentToKitten POST parents/assign */
export async function assignParentToKittenUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignParentToKittenUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<string>("parents/assign", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** changeParentPhoto POST parents/change/photo */
export async function changeParentPhotoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeParentPhotoUsingPOSTParams,
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

  return request<string>("parents/change/photo", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    
    ...(options || {}),
  });
}

/** getParentsByKittenId GET parents/kitten/${param0} */
export async function getParentsByKittenIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParentsByKittenIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, ...queryParams } = params;
  return request<API.Parent[]>(`parents/kitten/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getAllParents GET parents/list */
export async function getAllParentsUsingGet(options?: { [key: string]: any }) {
  return request<API.Parent[]>("parents/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** removeParentFromKitten DELETE parents/remove */
export async function removeParentFromKittenUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeParentFromKittenUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<string>("parents/remove", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateParent POST parents/update */
export async function updateParentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParentUsingPOSTParams,
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

  return request<string>("parents/update", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    
    ...(options || {}),
  });
}
