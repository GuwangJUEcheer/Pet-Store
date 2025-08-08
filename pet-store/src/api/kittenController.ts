// @ts-ignore
/* eslint-disable */
import request from "../Request/request";

/** addKitten POST add */
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

/** changeKittenPhoto POST change/photo */
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

/** getKittenById GET get/${param0} */
export async function getKittenByIdUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getKittenByIdUsingGETParams,
    options?: { [key: string]: any }
) {
    const {id: param0, ...queryParams} = params;
    return request<Record<string, any>>(`get/${param0}`, {
        method: "GET",
        params: {...queryParams},
        ...(options || {}),
    });
}

/** deleteKitten DELETE kittens/${param0} */
export async function deleteKittenUsingDelete(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.deleteKittenUsingDELETEParams,
    options?: { [key: string]: any }
) {
    const {id: param0, ...queryParams} = params;
    return request<string>(`kittens/${param0}`, {
        method: "DELETE",
        params: {...queryParams},
        ...(options || {}),
    });
}

/** deleteParentImage DELETE kittens/parents/${param0}/delete */
export async function deleteParentImageUsingDelete(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.deleteParentImageUsingDELETEParams,
    options?: { [key: string]: any }
) {
    const {id: param0, ...queryParams} = params;
    return request<Record<string, any>>(`kittens/parents/${param0}/delete`, {
        method: "DELETE",
        params: {...queryParams},
        ...(options || {}),
    });
}

/** getPublicKittens GET list */
export async function getPublicKittensUsingGet(options?: {
    [key: string]: any;
}) {
    return request<API.Kitten[]>("list", {
        method: "GET",
        ...(options || {}),
    });
}

/** getKittenParents GET parents */
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

/** 正确写法：使用 body 传参 */
export async function updateKittenUsingPost(
    body: API.updateKittenUsingPOSTParams,
    options?: { [key: string]: any }
) {
    return request<Record<string, any>>('updateKitten', {
        method: 'POST',
        data: body, // ✅ 用 data 而不是 params
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    });
}
