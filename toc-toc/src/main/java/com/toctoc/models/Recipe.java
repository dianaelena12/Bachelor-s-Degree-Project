package com.toctoc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "recipes", type = "recipe")
public class Recipe {
    @Id
    private long Id;

    private String title;

    private Integer total_time;

    private String yields;

    private String instructions;

    private List<String> ingredients;

    private String image;

    private String links;

    private List<String> tags;

    public long getId() {
        return Id;
    }

    public Recipe() {
    }

    public Recipe(long id, String title, Integer total_time, String yields, String instructions, List<String> ingredients, String image, String links, List<String> tags) {
        Id = id;
        this.title = title;
        this.total_time = total_time;
        this.yields = yields;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.image = image;
        this.links = links;
        this.tags = tags;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTotal_time() {
        return total_time;
    }

    public void setTotal_time(Integer total_time) {
        this.total_time = total_time;
    }

    public String getYields() {
        return yields;
    }

    public void setYields(String yields) {
        this.yields = yields;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLinks() {
        return links;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}