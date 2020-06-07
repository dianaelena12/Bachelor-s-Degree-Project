package com.toctoc.models;

import org.springframework.data.annotation.Id;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Document("userHistory")
public class UserHistory {

    @Id
    private String id;

    @Field
    private String userId;

    @Field
    private Map<String, String> history;

    @Field
    private Map<String, String> favourites;

    public UserHistory() {
    }

    public UserHistory(String userId, Map<String, String> history, Map<String, String> favourites) {
        this.userId = userId;
        this.history = history;
        this.favourites = favourites;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Map<String, String> getHistory() {
        return history;
    }

    public void setHistory(Map<String, String> history) {
        this.history = history;
    }

    public Map<String, String> getFavourites() {
        return favourites;
    }

    public void setFavourites(Map<String, String> favourites) {
        this.favourites = favourites;
    }

    public List<String> getHistoryValues() {
        List<String> values = history.keySet().stream().map(key -> history.get(key)).collect(Collectors.toList());
        Collections.reverse(values);
        return values;
    }

    public List<String> getFavouritesValues() {
        List<String> values = favourites.keySet().stream().map(key -> favourites.get(key)).collect(Collectors.toList());
        Collections.reverse(values);
        return values;
    }

}
