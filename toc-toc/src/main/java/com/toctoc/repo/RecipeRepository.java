package com.toctoc.repo;

import com.toctoc.models.Recipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends ElasticsearchRepository<Recipe, String> {
    public List<Recipe> findByTitle(String title);

    public List<Recipe> findByIngredientsIn(Collection<String> ingredients);

    public List<Recipe> findAllByIdIn(Collection<String> ids);

    public Optional<Recipe> findBy(String id);

//    @Query("{\"size\" : 1, \"query\": {\"function_score\": { \"functions\": [ { \"random_score\": { \"seed\": \"?0\" } } ] } }}")
//    public Recipe getRandom(Long seed);
}
