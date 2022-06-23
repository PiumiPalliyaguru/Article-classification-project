package com.ppalliyaguru.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="article_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleCategory {

    @Id
    private int id;

    private String name;

    private String description;

    private String main_category;
}
