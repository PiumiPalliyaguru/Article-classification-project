package com.ppalliyaguru.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    private String name;
    private String description;
    private String main_category;
    private double probability;
}
