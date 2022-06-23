package com.ppalliyaguru.backend.repository;

import com.ppalliyaguru.backend.model.ArticleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Integer> {

    Optional<ArticleCategory> findByName(String name);
}
