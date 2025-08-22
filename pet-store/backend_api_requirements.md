# Backend API Requirements for Photo Management System

## 🎯 Overview
This document outlines the backend API requirements for implementing the kitten photo management system.

## 📋 Database Schema Requirements

### New Table: `kitten_photos`
```sql
CREATE TABLE kitten_photos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kitten_id BIGINT NOT NULL,
    photo_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kitten_id (kitten_id),
    INDEX idx_display_order (kitten_id, display_order)
);
```

## 🚀 Required API Endpoints

### 1. Get Kitten Photos
```
GET kittens/{kittenId}/photos
Response: List<KittenPhoto>
```

### 2. Upload Kitten Photo
```
POST kittens/{kittenId}/photos
Content-Type: multipart/form-data
Body: 
  - file: MultipartFile
  - displayOrder: Integer (optional)
  - isPrimary: Boolean (optional)

S3 Path: kitten/{kittenId}/{fileName}
Response: KittenPhoto
```

### 3. Delete Kitten Photo
```
DELETE kittens/{kittenId}/photos/{photoId}
Response: Success message
Action: Also delete from S3
Note: 应用层面需要处理数据一致性，确保删除小猫时也清理相关照片
```

### 4. Update Photo Order
```
PUT kittens/{kittenId}/photos/reorder
Body: List<{photoId: Long, displayOrder: Integer}>
Response: Success message
```

### 5. Set Primary Photo
```
PUT kittens/{kittenId}/photos/{photoId}/primary
Response: Success message
Action: Set isPrimary=true for this photo, false for others
```

### 6. Bulk Upload Photos
```
POST kittens/{kittenId}/photos/bulk
Content-Type: multipart/form-data
Body: files: MultipartFile[]
Response: List<KittenPhoto>
```

## 📊 DTO Classes

### KittenPhoto DTO
```java
public class KittenPhoto {
    private Long id;
    private Long kittenId;
    private String photoUrl;
    private String fileName;
    private Long fileSize;
    private LocalDateTime uploadDate;
    private Integer displayOrder;
    private Boolean isPrimary;
    // getters and setters
}
```

### PhotoUploadRequest
```java
public class PhotoUploadRequest {
    private Integer displayOrder = 0;
    private Boolean isPrimary = false;
    // getters and setters
}
```

## 🔧 S3 Configuration

### Directory Structure
```
pet-store-bucket-2025/
└── kitten/
    ├── {kittenId}/
    │   ├── photo1.jpg
    │   ├── photo2.jpg
    │   └── ...
```

### S3 Manager Updates
- Add method: `uploadKittenPhoto(kittenId, file)`
- Add method: `deleteKittenPhoto(kittenId, fileName)`
- Add method: `listKittenPhotos(kittenId)`

## 🎨 Frontend Integration

### New React Components Needed
1. **PhotoCarousel**: Display multiple photos with navigation
2. **PhotoManager**: Admin interface for photo CRUD operations
3. **PhotoUploader**: Drag & drop photo upload interface

### API Service Updates
```typescript
// New API calls to add to kittenController.ts
export async function getKittenPhotosUsingGet(params: {kittenId: number})
export async function uploadKittenPhotoUsingPost(params: {kittenId: number}, file: File)
export async function deleteKittenPhotoUsingDelete(params: {kittenId: number, photoId: number})
export async function reorderKittenPhotosUsingPut(params: {kittenId: number}, body: PhotoOrder[])
export async function setPrimaryPhotoUsingPut(params: {kittenId: number, photoId: number})
```

## ⚡ Implementation Priority

### Phase 1: Core Photo Management
1. ✅ Frontend UI updates (completed)
2. 🔄 Database table creation
3. 🔄 Basic CRUD APIs (get, upload, delete)
4. 🔄 S3 integration

### Phase 2: Advanced Features  
1. Photo ordering and primary photo selection
2. Bulk upload functionality
3. Photo optimization and thumbnails
4. Enhanced UI with drag & drop

### Phase 3: Performance & UX
1. Image lazy loading
2. Photo caching
3. Progress indicators for uploads
4. Error handling improvements

## 📝 Notes
- All photo operations should be restricted to admin users (role = 0)
- S3 paths should follow the pattern: `kitten/{kittenId}/{filename}`
- Consider adding image validation (size, format, dimensions)
- Implement proper error handling for S3 operations
- Add logging for photo management operations
- **数据一致性处理**：由于没有使用外键，需要在应用层面处理：
  - 删除小猫时，同时删除 `kitten_photos` 表中对应记录
  - 删除小猫时，同时删除 S3 中 `kitten/{kittenId}/` 目录下的所有文件
  - 可考虑在 Service 层添加事务处理确保数据一致性