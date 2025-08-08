import request from '../Request/request';

// 照片排序请求类型
export interface PhotoOrder {
  photoId: number;
  displayOrder: number;
}

export interface PhotoReorderRequest {
  photoOrders: PhotoOrder[];
}

// 小猫照片类型
export interface KittenPhoto {
  id?: number;
  kittenId?: number;
  photoUrl?: string;
  fileName?: string;
  fileSize?: number;
  uploadDate?: string;
  displayOrder?: number;
  isPrimary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 获取小猫照片列表
 */
export async function getKittenPhotosUsingGet(params: { kittenId: number }) {
  return request<KittenPhoto[]>(`kittens/${params.kittenId}/photos`, {
    method: 'GET',
  });
}

/**
 * 上传小猫照片
 */
export async function uploadKittenPhotoUsingPost(
  params: { 
    kittenId: number;
    displayOrder?: number;
    isPrimary?: boolean;
  },
  body: {},
  file?: File
) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  if (params.displayOrder !== undefined) {
    formData.append('displayOrder', params.displayOrder.toString());
  }
  if (params.isPrimary !== undefined) {
    formData.append('isPrimary', params.isPrimary.toString());
  }

  return request<KittenPhoto>(`kittens/${params.kittenId}/photos`, {
    method: 'POST',
    data: formData,

  });
}

/**
 * 删除小猫照片
 */
export async function deleteKittenPhotoUsingDelete(params: { kittenId: number; photoId: number }) {
  return request<string>(`kittens/${params.kittenId}/photos/${params.photoId}`, {
    method: 'DELETE',
  });
}

/**
 * 重新排序照片
 */
export async function reorderKittenPhotosUsingPut(
  params: { kittenId: number },
  body: PhotoReorderRequest
) {
  return request<string>(`kittens/${params.kittenId}/photos/reorder`, {
    method: 'PUT',
    data: body,
  });
}

/**
 * 设置主要照片
 */
export async function setPrimaryPhotoUsingPut(params: { kittenId: number; photoId: number }) {
  return request<string>(`kittens/${params.kittenId}/photos/${params.photoId}/primary`, {
    method: 'PUT',
  });
}

/**
 * 批量上传照片
 */
export async function bulkUploadPhotosUsingPost(
  params: { kittenId: number },
  body: {},
  files?: File[]
) {
  const formData = new FormData();
  if (files) {
    files.forEach((file) => {
      formData.append('files', file);
    });
  }

  return request<KittenPhoto[]>(`kittens/${params.kittenId}/photos/bulk`, {
    method: 'POST',
    data: formData,
  });
}