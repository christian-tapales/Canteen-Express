package com.appdevg5.canteencoders.dto;

import lombok.Data;

@Data
public class ShopDTO {
    // We only expose the fields we want the public to see
    private Integer id;
    private String name;
    private String description;
    private String imageUrl;
    private String paymentNumber;
    private Boolean isOpen;

    // Explicit getters and setters for compatibility
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getImageUrl() { 
        return imageUrl; 
    }
    public void setImageUrl(String imageUrl) { 
        this.imageUrl = imageUrl; 
    }
    public String getPaymentNumber() { return paymentNumber; }
    public void setPaymentNumber(String paymentNumber) { this.paymentNumber = paymentNumber; }

    public Boolean getIsOpen() { return isOpen; }
    public void setIsOpen(Boolean isOpen) { this.isOpen = isOpen; }
}
