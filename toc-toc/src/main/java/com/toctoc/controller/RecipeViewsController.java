package com.toctoc.controller;

import com.toctoc.models.RecipeView;
import com.toctoc.service.RecipeService;
import com.toctoc.service.RecipeViewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/views")
public class RecipeViewsController {

    @Autowired
    private RecipeViewsService viewService;

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/post/{recipeId}")
    public HttpStatus postView(@PathVariable String recipeId) {
        var exists = viewService.getByRecipeId(recipeId);

        if (exists == null) {
            viewService.save(new RecipeView(recipeId, 1));
        } else {
            exists.setNumberOfViews(exists.getNumberOfViews() + 1);
            viewService.save(exists);
        }
        return HttpStatus.OK;
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity getRecipeViewsById(@PathVariable String recipeId) {
        var recipe = viewService.getByRecipeId(recipeId);

        if (recipe == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(recipe, HttpStatus.OK);
    }

    @GetMapping("/top")
    public List<String> getTopRecipesByViews() {
        var top = viewService.getMostPopular();

        if (top == null) {
            return Collections.emptyList();
        }
        return top;
    }
}
