declare namespace API {
    type addKittenUsingPOSTParams = {
        birthday?: string;
        color?: string;
        description?: string;
        gender?: string;
        name?: string;
        price?: number;
        status?: string;
        fatherId?: number;
        motherId?: number;
    };

    type addParentUsingPOSTParams = {
        birthday?: string;
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

    type changeKittenPhotoUsingPOSTParams = {
        /** id */
        id: number;
    };

    type changeParentPhotoUsingPOSTParams = {
        /** id */
        id: number;
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

    type getParentByIdUsingGETParams = {
        /** id */
        id: number;
    };

    type getParentsByKittenIdUsingGETParams = {
        /** kittenId */
        kittenId: number;
    };

    type Kitten = {
        birthday?: string;
        color?: string;
        description?: string;
        gender?: string;
        id?: number;
        imgUrl?: string;
        name?: string;
        price?: number;
        status?: string;
        motherId?: number;
        fatherId?: number;
    };

    type KittenParent = {
        id?: number;
        kittenId?: number;
        parentId?: number;
        parentRole?: string; // "父" 或 "母"
        parentName?: string;
        imgUrl?: string;
        description?: string;
    };

    type LoginResponse = {
        code?: number;
        loginResult?: string;
        role?: number;
        token?: string;
        userId?: number;
        username?: string;
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

    type removeParentFromKittenUsingDELETEParams = {
        /** kittenId */
        kittenId: number;
        /** parentRole */
        parentRole: string;
    };

    type updateKittenUsingPOSTParams = {
        birthday?: string;
        color?: string;
        description?: string;
        gender?: string;
        id?: number;
        imgUrl?: string;
        name?: string;
        price?: number;
        status?: string;
        fatherId?: number;
        motherId?: number;
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
}
