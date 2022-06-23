package com.ppalliyaguru.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleClassifierRequest {

    private String articleTitle;
    private String articleAbstract;
    private double thresholdValue;
}
