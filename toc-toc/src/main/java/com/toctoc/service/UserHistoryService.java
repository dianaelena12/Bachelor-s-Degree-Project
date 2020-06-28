package com.toctoc.service;

import com.toctoc.models.UserHistory;
import com.toctoc.repo.UserHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHistoryService {

    @Autowired
    private UserHistoryRepository repository;

    public UserHistory getByUserId(String id) {
        return repository.getByUserId(id);
    }

    public void save(UserHistory history) {
        this.repository.save(history);
    }

    public boolean isFavourite(String userId, String recipeId) {
        repository.deleteAll();
        UserHistory history = repository.getByUserId(userId);
        if (history == null) {
            return false;
        }
        return history.getFavourites().contains(recipeId);
    }

    public boolean removeFavourite(String userId, String recipeId) {
        if (!isFavourite(userId, recipeId))
            return false;
        var history = this.getByUserId(userId);
        var response = history.getFavourites().remove(recipeId);
        save(history);
        return response;
    }


}
