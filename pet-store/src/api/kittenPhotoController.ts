// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** getKittenPhotos GET kittens/${param0}/photos */
export async function getKittenPhotosUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKittenPhotosUsingGETParams,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, ...queryParams } = params;
  return request<API.KittenPhoto[]>(`kittens/${param0}/photos`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** uploadKittenPhoto POST kittens/${param0}/photos */
export async function uploadKittenPhotoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadKittenPhotoUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, ...queryParams } = params;
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

  return request<API.KittenPhoto>(`kittens/${param0}/photos`, {
    method: "POST",
    params: {
      ...queryParams,
    },
    data: formData,
    
    ...(options || {}),
  });
}

/** deleteKittenPhoto DELETE kittens/${param0}/photos/${param1} */
export async function deleteKittenPhotoUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteKittenPhotoUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, photoId: param1, ...queryParams } = params;
  return request<string>(`kittens/${param0}/photos/${param1}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** setPrimaryPhoto PUT kittens/${param0}/photos/${param1}/primary */
export async function setPrimaryPhotoUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setPrimaryPhotoUsingPUTParams,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, photoId: param1, ...queryParams } = params;
  return request<string>(`kittens/${param0}/photos/${param1}/primary`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** bulkUploadPhotos POST kittens/${param0}/photos/bulk */
export async function bulkUploadPhotosUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bulkUploadPhotosUsingPOSTParams,
  body: {
    /** files */
    files: any[];
  },
  options?: { [key: string]: any }
) {
  const { kittenId: param0, ...queryParams } = params;
  const formData = new FormData();
  
  // Add each file to FormData
  if (body.files && Array.isArray(body.files)) {
    body.files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      }
    });
  }
  
  return request<API.KittenPhoto[]>(`kittens/${param0}/photos/bulk`, {
    method: "POST",
    params: { ...queryParams },
    data: formData,
    ...(options || {}),
  });
}

/** reorderKittenPhotos PUT kittens/${param0}/photos/reorder */
export async function reorderKittenPhotosUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reorderKittenPhotosUsingPUTParams,
  body: API.PhotoReorderRequest,
  options?: { [key: string]: any }
) {
  const { kittenId: param0, ...queryParams } = params;
  return request<string>(`kittens/${param0}/photos/reorder`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
