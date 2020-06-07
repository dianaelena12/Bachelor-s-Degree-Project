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


}
