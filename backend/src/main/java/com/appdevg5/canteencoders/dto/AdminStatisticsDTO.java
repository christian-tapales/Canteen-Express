package com.appdevg5.canteencoders.dto;

import java.math.BigDecimal;

/**
 * DTO for Admin Dashboard Statistics.
 * Contains aggregated data for display on admin panel.
 */
public class AdminStatisticsDTO {
    
    private Long totalOrders;
    private BigDecimal totalRevenue;
    private Long totalUsers;
    private Long totalShops;
    private Long totalFoodItems;
    
    // Order counts by status
    private Long pendingOrders;
    private Long preparingOrders;
    private Long readyOrders;
    private Long completedOrders;
    private Long cancelledOrders;
    private Long rejectedOrders;
    
    // Revenue breakdown
    private BigDecimal completedRevenue;
    private BigDecimal pendingRevenue;
    
    // Constructors
    public AdminStatisticsDTO() {
    }

    public AdminStatisticsDTO(Long totalOrders, BigDecimal totalRevenue, Long totalUsers, Long totalShops, Long totalFoodItems) {
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.totalUsers = totalUsers;
        this.totalShops = totalShops;
        this.totalFoodItems = totalFoodItems;
    }

    // Getters and Setters
    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalShops() {
        return totalShops;
    }

    public void setTotalShops(Long totalShops) {
        this.totalShops = totalShops;
    }

    public Long getTotalFoodItems() {
        return totalFoodItems;
    }

    public void setTotalFoodItems(Long totalFoodItems) {
        this.totalFoodItems = totalFoodItems;
    }

    public Long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(Long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public Long getPreparingOrders() {
        return preparingOrders;
    }

    public void setPreparingOrders(Long preparingOrders) {
        this.preparingOrders = preparingOrders;
    }

    public Long getReadyOrders() {
        return readyOrders;
    }

    public void setReadyOrders(Long readyOrders) {
        this.readyOrders = readyOrders;
    }

    public Long getCompletedOrders() {
        return completedOrders;
    }

    public void setCompletedOrders(Long completedOrders) {
        this.completedOrders = completedOrders;
    }

    public Long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(Long cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }

    public Long getRejectedOrders() {
        return rejectedOrders;
    }

    public void setRejectedOrders(Long rejectedOrders) {
        this.rejectedOrders = rejectedOrders;
    }

    public BigDecimal getCompletedRevenue() {
        return completedRevenue;
    }

    public void setCompletedRevenue(BigDecimal completedRevenue) {
        this.completedRevenue = completedRevenue;
    }

    public BigDecimal getPendingRevenue() {
        return pendingRevenue;
    }

    public void setPendingRevenue(BigDecimal pendingRevenue) {
        this.pendingRevenue = pendingRevenue;
    }
}
