package com.toctoc.repo;

import com.toctoc.models.Recipe;
import org.springframework.data.mongodb.repository.Query;

public interface RecipeRepositoryCustom {

    @Query("{\"size\" : 1, \"query\": {\"function_score\": { \"functions\": [ { \"random_score\": { \"seed\": \"?0\" } } ] } }}")
    public Recipe getRandom(Long seed);
}
