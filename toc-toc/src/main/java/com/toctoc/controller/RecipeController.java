package com.toctoc.controller;

import com.toctoc.models.Recipe;
import com.toctoc.repo.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeRepository repo;

    @Autowired
    public RecipeController(RecipeRepository repository) {
        this.repo = repository;
    }

    @PostMapping()
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        repo.save(recipe);
        return recipe;
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "*")
    public List<Recipe> findAll() {
        List<Recipe> recipes = new ArrayList<>();
        repo.findAll().forEach(recipes::add);
        return recipes;
    }

    @GetMapping("/{title}")
    @CrossOrigin(origins = "*")
    public List<Recipe> findByTitle(@PathVariable String title) {
        List<Recipe> recipes = new ArrayList<>();
        repo.findByTitle(title).forEach(recipes::add);
        return recipes;
    }

    @PostMapping("/by-ingredients")
    @CrossOrigin(origins = "*")
    public List<Recipe> findByIngredients(@RequestBody Collection<String> ingredients) {
        List<Recipe> recipes = new ArrayList<>();
        repo.findByIngredientsIn(ingredients).forEach(recipes::add);
        return recipes;
    }

}
