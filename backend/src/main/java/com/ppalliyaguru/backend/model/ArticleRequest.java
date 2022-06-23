package com.ppalliyaguru.backend.model;


import lombok.Data;

import java.io.Serializable;

@Data
public class ArticleRequest implements Serializable {

    private String articleTitle;
    private String articleAbstract;
}
