package com.ppalliyaguru.backend.service;


import com.ppalliyaguru.backend.model.ArticleClassifierRequest;
import com.ppalliyaguru.backend.model.ArticleRequest;
import com.ppalliyaguru.backend.model.Category;
import com.ppalliyaguru.backend.model.ClassificationResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.doReturn;

@RunWith(MockitoJUnitRunner.class)
public class ArticleServiceTest {

    @Mock
    private ExtArticleClassifierService extArticleClassifierService;

    @InjectMocks
    @Spy
    private ArticleService articleService;

    @Test
    public void testGetArticleCategorySuccess() {
        ArticleRequest request = new ArticleRequest();
        request.setArticleTitle("Detecting Epileptic");
        request.setArticleAbstract("Seizures from EEG Data using Neural Networks");

        ClassificationResponse classificationResponse = new ClassificationResponse();
        Map<String, Double> categoryMap = new HashMap<>();
        categoryMap.put("q-bio", 0.78);
        classificationResponse.setCategories(categoryMap);

        ArticleClassifierRequest classifierRequest = new ArticleClassifierRequest();
        doReturn(classificationResponse).when(extArticleClassifierService).classifyArticle(classifierRequest);

        List<Category> categoryList  = articleService.getArticleCategory(request);
        assertNotNull(categoryList);

    }
}
