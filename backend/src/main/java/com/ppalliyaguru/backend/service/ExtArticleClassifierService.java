package com.ppalliyaguru.backend.service;

import com.ppalliyaguru.backend.model.ArticleClassifierRequest;
import com.ppalliyaguru.backend.model.ArticleRequest;
import com.ppalliyaguru.backend.model.ClassificationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;


@Service
@Slf4j
public class ExtArticleClassifierService {

    private static final String ENDPOINT_CLASSIFY_ARTICLE = "/predict";
    private static final String ENDPOINT_GET_ARTICLE_CATEGORY = "/";

    @Value("${extsvc.url.classifierService}")
    private String baseUrl;

    @Autowired
    public RestTemplate restTemplate;


    public ClassificationResponse classifyArticle(ArticleClassifierRequest articleRequest) {
        String url = baseUrl + ENDPOINT_CLASSIFY_ARTICLE;
        ClassificationResponse response = restTemplate.postForObject(url, articleRequest, ClassificationResponse.class);
        int count = response.getCategories().keySet().size();
        log.debug("Response from classifier service. Category count : {}", count);
        return response;
    }

    public List<String> getAllCategory() {
        String url = baseUrl + ENDPOINT_GET_ARTICLE_CATEGORY;
        String[] categoryList = restTemplate.getForObject(url, String[].class);
        return Arrays.asList(categoryList);
    }
}
