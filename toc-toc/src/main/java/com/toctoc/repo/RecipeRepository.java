package com.toctoc.repo;

import com.toctoc.models.Recipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends ElasticsearchRepository<Recipe, Long> {
    List<Recipe> findByTitle(String title);
}
