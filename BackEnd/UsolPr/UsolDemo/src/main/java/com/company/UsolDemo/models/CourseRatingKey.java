package com.company.UsolDemo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRatingKey implements Serializable {
    @Column(name = "OrderID")
    Long orderID;

    @Column(name = "ProductID")
    Long productID;
}
