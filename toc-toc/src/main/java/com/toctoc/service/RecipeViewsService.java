package com.toctoc.service;

import com.toctoc.models.RecipeView;
import com.toctoc.repo.RecipeViewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeViewsService {

    @Autowired
    private RecipeViewsRepository repository;

    public RecipeView getByRecipeId(String recipeId) {
        return repository.getByRecipeId(recipeId);
    }

    public void save(RecipeView recipeView) {
        repository.save(recipeView);
    }

    public List<String> getMostPopular() {
        return repository.findDistinctTop10ByOrderByNumberOfViewsDesc().stream().map(recipeView -> recipeView.getRecipeId()).collect(Collectors.toList());
    }
}
