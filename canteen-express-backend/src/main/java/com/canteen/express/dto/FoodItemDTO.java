package com.canteen.express.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class FoodItemDTO {
    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
}
