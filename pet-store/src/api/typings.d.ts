declare namespace API {
  type addKittenUsingPOSTParams = {
    birthday?: string;
    color?: string;
    description?: string;
    gender?: string;
    name?: string;
    price?: number;
    status?: string;
  };

  type addParentUsingPOSTParams = {
    breed?: string;
    color?: string;
    description?: string;
    gender?: string;
    name?: string;
  };

  type assignParentToKittenUsingPOSTParams = {
    /** kittenId */
    kittenId: number;
    /** parentId */
    parentId: number;
    /** parentRole */
    parentRole: string;
  };

  type bulkUploadPhotosUsingPOSTParams = {
    /** kittenId */
    kittenId: number;
  };

  type changeKittenPhotoUsingPOSTParams = {
    /** id */
    id: number;
  };

  type changeParentPhotoUsingPOSTParams = {
    /** id */
    id: number;
  };

  type deleteKittenPhotoUsingDELETEParams = {
    /** kittenId */
    kittenId: number;
    /** photoId */
    photoId: number;
  };

  type deleteKittenUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteParentImageUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteParentUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getKittenByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getKittenParentsUsingGETParams = {
    /** id */
    id: number;
  };

  type getKittenPhotosUsingGETParams = {
    /** kittenId */
    kittenId: number;
  };

  type getParentByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getParentsByKittenIdUsingGETParams = {
    /** kittenId */
    kittenId: number;
  };

  type getPastKittensUsingGETParams = {
    /** page */
    page?: number;
    /** size */
    size?: number;
  };

  type getPublicKittensUsingGETParams = {
    /** page */
    page?: number;
    /** size */
    size?: number;
  };

  type VisitApplicationRequest = {
    kittenName?: string;
    kittenId?: number;
    visitorName: string;
    phone: string;
    email: string;
    visitDate: string;
    numberOfVisitors: number;
    transportation: string;
    needPickup: string;
    memo?: string;
  };

  type Kitten = {
    birthday?: string;
    color?: string;
    description?: string;
    fatherId?: number;
    gender?: string;
    id?: number;
    imgUrl?: string;
    motherId?: number;
    name?: string;
    price?: number;
    status?: string;
  };

  type KittenPhoto = {
    createdAt?: string;
    displayOrder?: number;
    fileName?: string;
    fileSize?: number;
    id?: number;
    isPrimary?: boolean;
    kittenId?: number;
    photoUrl?: string;
    updatedAt?: string;
    uploadDate?: string;
  };

  type LoginResponse = {
    code?: number;
    loginResult?: string;
    role?: number;
    token?: string;
    userId?: number;
    username?: string;
  };

  type markKittenAsSoldUsingPOSTParams = {
    /** id */
    id: number;
  };

  type Parent = {
    birthday?: string;
    breed?: string;
    color?: string;
    createdAt?: string;
    description?: string;
    gender?: string;
    id?: number;
    imgUrl?: string;
    name?: string;
    updatedAt?: string;
  };

  type PhotoOrderItem = {
    displayOrder?: number;
    photoId?: number;
  };

  type PhotoReorderRequest = {
    photoOrders?: PhotoOrderItem[];
  };

  type removeParentFromKittenUsingDELETEParams = {
    /** kittenId */
    kittenId: number;
    /** parentRole */
    parentRole: string;
  };

  type reorderKittenPhotosUsingPUTParams = {
    /** kittenId */
    kittenId: number;
  };

  type setPrimaryPhotoUsingPUTParams = {
    /** kittenId */
    kittenId: number;
    /** photoId */
    photoId: number;
  };

  type UpdateKittenRequest = {
    birthday?: string;
    color?: string;
    description?: string;
    fatherId?: number;
    gender?: string;
    id?: number;
    imgUrl?: string;
    motherId?: number;
    name?: string;
    price?: number;
    status?: string;
  };

  type updateParentUsingPOSTParams = {
    birthday?: string;
    breed?: string;
    color?: string;
    description?: string;
    gender?: string;
    id?: number;
    imgUrl?: string;
    name?: string;
  };

  type uploadKittenPhotoUsingPOSTParams = {
    /** displayOrder */
    displayOrder?: number;
    /** isPrimary */
    isPrimary?: boolean;
    /** kittenId */
    kittenId: number;
  };
}
