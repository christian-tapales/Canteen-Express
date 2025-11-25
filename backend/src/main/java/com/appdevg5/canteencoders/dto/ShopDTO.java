package com.appdevg5.canteencoders.dto;

import lombok.Data;

@Data
public class ShopDTO {
    // We only expose the fields we want the public to see
    private Integer id;
    private String name;
    private String description;

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
}
