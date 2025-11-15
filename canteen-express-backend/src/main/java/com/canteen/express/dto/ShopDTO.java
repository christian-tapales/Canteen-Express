package com.canteen.express.dto;

import lombok.Data;

@Data
public class ShopDTO {
    // We only expose the fields we want the public to see
    private Integer shopId;
    private String shopName;
    private String description;
}