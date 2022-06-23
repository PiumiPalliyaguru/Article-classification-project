package com.ppalliyaguru.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassificationResponse {

    private Map<String, Double> categories;
}
