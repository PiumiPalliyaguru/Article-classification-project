package com.ppalliyaguru.backend.service;

import antlr.StringUtils;
import com.ppalliyaguru.backend.model.*;
import com.ppalliyaguru.backend.repository.ArticleCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticleService {

    @Autowired
    private ExtArticleClassifierService classifierService;

    @Autowired
    private ArticleCategoryRepository categoryRepository;

    public List<Category> getArticleCategory(ArticleRequest articleRequest) {

        List<Category> categoryList = new ArrayList<>();
        ArticleClassifierRequest request = new ArticleClassifierRequest(articleRequest.getArticleTitle(),
                articleRequest.getArticleAbstract(), 0.50);

        ClassificationResponse response = classifierService.classifyArticle(request);

        if(response != null) {
            response.getCategories().forEach((k, v) -> {
                Category category = new Category();
                if (v != 0) {
                    category.setName(k);
                    category.setProbability(v);
                    getArxivCategory(k, category);
                }
                categoryList.add(category);
            });
        }
        return categoryList;
    }

    public void getArxivCategory(String key, Category category) {
        ArticleCategory articleCategory = categoryRepository.findByName(key).orElse(null);
        if (articleCategory != null) {
            category.setDescription(articleCategory.getDescription());
            category.setMain_category(articleCategory.getMain_category());
        } else {
            category.setDescription("");
            category.setMain_category("");
        }
    }

    public List<ArticleCategory> getAllCategory() {
        List<String> categoryList= classifierService.getAllCategory();

        List<ArticleCategory> categories = new ArrayList<>();
        categoryList.stream().forEach(c -> {
            ArticleCategory category  = categoryRepository.findByName(c).orElse(null);
          if (category != null) {
              categories.add(category);
          } else {
              ArticleCategory cat = new ArticleCategory();
              cat.setName(c);
              cat.setMain_category("");
              cat.setDescription("");
              categories.add(cat);
          }
        });
        return categories;
    }
}
