package cn.itcast.mp.model;

public class KittenParent {
    private Long id;
    private Long kittenId;
    private String parentName;
    private String role; // "father" or "mother"
    private String imgUrl;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getKittenId() {
        return kittenId;
    }

    public void setKittenId(Long kittenId) {
        this.kittenId = kittenId;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
