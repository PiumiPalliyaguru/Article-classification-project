package com.ppalliyaguru.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {

    private String title;
    private String articleAbstract;
    private Category category;
}
