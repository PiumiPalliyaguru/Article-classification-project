package com.ppalliyaguru.backend.controller;

import com.ppalliyaguru.backend.model.ArticleCategory;
import com.ppalliyaguru.backend.model.Category;
import com.ppalliyaguru.backend.model.ArticleRequest;
import com.ppalliyaguru.backend.service.ArticleService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
@Slf4j
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/categories")
    public List<ArticleCategory> getAllCategory() {
        List<ArticleCategory> categories = articleService.getAllCategory();
        return categories;
    }

    @PostMapping("/category")
    public List<Category> getArticleCategory(@RequestBody ArticleRequest articleRequest) throws Exception {
        log.debug("Inside getArticleCategory method of ArticleController. paper title: {}, paper abstract: {}",
                articleRequest.getArticleTitle(), articleRequest.getArticleAbstract());
        try{
            if(articleRequest.getArticleAbstract().length() < 50) {
                throw new Exception("Article data invalid");
            }
            return articleService.getArticleCategory(articleRequest);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

}
