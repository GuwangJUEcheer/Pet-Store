package cn.itcast.mp.model.kitten;

import java.util.List;

/**
 * 照片重新排序请求
 */
public class PhotoReorderRequest {
    
    private List<PhotoOrderItem> photoOrders;
    
    public PhotoReorderRequest() {}
    
    public PhotoReorderRequest(List<PhotoOrderItem> photoOrders) {
        this.photoOrders = photoOrders;
    }
    
    public List<PhotoOrderItem> getPhotoOrders() {
        return photoOrders;
    }
    
    public void setPhotoOrders(List<PhotoOrderItem> photoOrders) {
        this.photoOrders = photoOrders;
    }
    
    /**
     * 照片排序项
     */
    public static class PhotoOrderItem {
        private Long photoId;
        private Integer displayOrder;
        
        public PhotoOrderItem() {}
        
        public PhotoOrderItem(Long photoId, Integer displayOrder) {
            this.photoId = photoId;
            this.displayOrder = displayOrder;
        }
        
        public Long getPhotoId() {
            return photoId;
        }
        
        public void setPhotoId(Long photoId) {
            this.photoId = photoId;
        }
        
        public Integer getDisplayOrder() {
            return displayOrder;
        }
        
        public void setDisplayOrder(Integer displayOrder) {
            this.displayOrder = displayOrder;
        }
        
        @Override
        public String toString() {
            return "PhotoOrderItem{" +
                    "photoId=" + photoId +
                    ", displayOrder=" + displayOrder +
                    '}';
        }
    }
    
    @Override
    public String toString() {
        return "PhotoReorderRequest{" +
                "photoOrders=" + photoOrders +
                '}';
    }
}