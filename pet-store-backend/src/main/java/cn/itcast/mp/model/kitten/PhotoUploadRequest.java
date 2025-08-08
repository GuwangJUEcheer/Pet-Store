package cn.itcast.mp.model.kitten;

/**
 * 照片上传请求
 */
public class PhotoUploadRequest {
    
    private Integer displayOrder = 0;
    
    private Boolean isPrimary = false;
    
    // 构造函数
    public PhotoUploadRequest() {}
    
    public PhotoUploadRequest(Integer displayOrder, Boolean isPrimary) {
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.isPrimary = isPrimary != null ? isPrimary : false;
    }
    
    // Getter 和 Setter
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
    
    public Boolean getIsPrimary() {
        return isPrimary;
    }
    
    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }
    
    @Override
    public String toString() {
        return "PhotoUploadRequest{" +
                "displayOrder=" + displayOrder +
                ", isPrimary=" + isPrimary +
                '}';
    }
}