package com.toctoc.controller;

import com.toctoc.models.Recipe;
import com.toctoc.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @PostMapping()
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        service.save(recipe);
        return recipe;
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "*")
    public List<Recipe> findAll() {
        List<Recipe> recipes = new ArrayList<>();
        service.findAll().forEach(recipes::add);
        return recipes;
    }

    @GetMapping("/{title}")
    @CrossOrigin(origins = "*")
    public List<Recipe> findByTitle(@PathVariable String title) {
        List<Recipe> recipes = new ArrayList<>();
        service.findByTitle(title).forEach(recipes::add);
        return recipes;
    }

    @GetMapping("/get/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public Optional<Recipe> findById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping("/by-ingredients")
    @CrossOrigin(origins = "*")
    public List<Recipe> findByIngredients(@RequestBody Collection<String> ingredients) {
        List<Recipe> recipes = new ArrayList<>();
        service.findByIngredientsIn(ingredients).forEach(recipes::add);
        return recipes;
    }

    @PostMapping("/by-ids")
    @CrossOrigin(origins = "*")
    public List<Optional<Recipe>> findByIds(@RequestBody List<String> ids) {
        List<Recipe> recipes = new ArrayList<>();
        return service.getRecipesFromIdsList(ids);
    }

    @GetMapping("/random")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Recipe> getRandom() {
        var result = this.service.getRandom();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
