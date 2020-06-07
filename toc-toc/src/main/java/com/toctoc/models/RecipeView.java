package com.toctoc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("recipeViews")
public class RecipeView {

    @Id
    private String id;
    @Field
    private String recipeId;
    @Field
    private int numberOfViews;

    public RecipeView() {
    }

    public RecipeView(String recipeId, int numberOfViews) {
        this.recipeId = recipeId;
        this.numberOfViews = numberOfViews;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public int getNumberOfViews() {
        return numberOfViews;
    }

    public void setNumberOfViews(int numberOfViews) {
        this.numberOfViews = numberOfViews;
    }
}
