package com.toctoc.service;


import com.toctoc.models.Recipe;
import com.toctoc.repo.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;


@Service
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    public void save(Recipe recipe) {
        repository.save(recipe);
    }

    public Iterable<Recipe> findAll() {
        return repository.findAll();
    }

    public Iterable<Recipe> findByTitle(String title) {
        return repository.findByTitle(title);
    }

    public Iterable<Recipe> findByIngredientsIn(Collection<String> ingredients) {
        return repository.findByIngredientsIn(ingredients);
    }

    public List<Optional<Recipe>> getRecipesFromIdsList(List<String> recipeIds) {
        return recipeIds.stream().map(id -> repository.findById(id)).collect(Collectors.toList());
    }

    public Optional<Recipe> getById(String id) {
        return repository.findById(id);
    }

    public void removeById(String id) {
        repository.deleteById(id);
    }

    public Recipe getRandom() {
        Long seed = ZonedDateTime.now().toInstant().toEpochMilli();
        int int_random = ThreadLocalRandom.current().nextInt();
        Long number = seed - int_random;
        List<Recipe> all = new ArrayList<>();
        repository.findAll().forEach(all::add);
        return all.get((int) (number % repository.count()));
    }

}
