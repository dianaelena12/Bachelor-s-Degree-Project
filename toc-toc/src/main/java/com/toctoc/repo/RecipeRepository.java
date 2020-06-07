package com.toctoc.repo;

import com.toctoc.models.Recipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends ElasticsearchRepository<Recipe, String> {
    List<Recipe> findByTitle(String title);

    List<Recipe> findByIngredientsIn(Collection<String> ingredients);

    List<Recipe> findAllByIdIn(Collection<String> ids);

    Optional<Recipe> findBy(String id);
}
