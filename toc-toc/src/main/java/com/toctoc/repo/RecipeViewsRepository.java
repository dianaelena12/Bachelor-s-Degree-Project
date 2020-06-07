package com.toctoc.repo;

import com.toctoc.models.RecipeView;

import java.util.List;

public interface RecipeViewsRepository extends BaseMongoRepository<RecipeView> {

    public RecipeView getByRecipeId(String id);

    public List<RecipeView> findDistinctTop10ByOrderByNumberOfViewsDesc();

    public void deleteByRecipeId(String id);
}
