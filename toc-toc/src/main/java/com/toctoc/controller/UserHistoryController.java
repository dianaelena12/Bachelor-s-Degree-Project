package com.toctoc.controller;

import com.toctoc.models.UserHistory;
import com.toctoc.repo.UserHistoryRepository;
import com.toctoc.repo.UserRepository;
import com.toctoc.service.UserHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;

@RestController
@RequestMapping("/history")
public class UserHistoryController {

    @Autowired
    private UserHistoryService historyService;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/{email}/{recipeId}")
    public ResponseEntity postHistory(@PathVariable String email, @PathVariable String recipeId) {
        var user = userRepository.getUserByEmail(email);
        var history = historyService.getByUserId(user.getId());

        if (history == null) {
            Map<String, String> historyMap = new HashMap<>();
            var currentTime = java.time.Instant.now().toString();
            historyMap.put(currentTime, recipeId);
            Map<String, String> favouritesMap = new HashMap<>();
            historyService.save(new UserHistory(user.getId(), historyMap, favouritesMap));
        } else {
            var currentTime = java.time.Instant.now().toString();
            history.getHistory().put(currentTime, recipeId);
            historyService.save(history);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/favourite/{email}/{recipeId}")
    public ResponseEntity postFavourite(@PathVariable String email, @PathVariable String recipeId) {
        var user = userRepository.getUserByEmail(email);
        var history = historyService.getByUserId(user.getId());

        if (history == null) {
            Map<String, String> favouritesMap = new HashMap<>();
            var currentTime = java.time.Instant.now().toString();
            favouritesMap.put(currentTime, recipeId);
            Map<String, String> historyMap = new HashMap<>();
            historyService.save(new UserHistory(user.getId(), historyMap, favouritesMap));
        } else {
            var currentTime = java.time.Instant.now().toString();
            history.getFavourites().put(currentTime, recipeId);
            historyService.save(history);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List> getHistoryByEmail(@PathVariable String email) {
        var user = userRepository.getUserByEmail(email);

        var history = historyService.getByUserId(user.getId());

        if (history == null) {
            return new ResponseEntity<>(emptyList(), HttpStatus.OK);
        }
        return new ResponseEntity<List>(history.getHistoryValues(), HttpStatus.OK);
    }

    @GetMapping("/favourite/{email}")
    public ResponseEntity<List> getFavouritesByEmail(@PathVariable String email) {
        var user = userRepository.getUserByEmail(email);

        var history = historyService.getByUserId(user.getId());

        if (history == null) {
            return new ResponseEntity<>(emptyList(), HttpStatus.OK);
        }
        return new ResponseEntity<List>(history.getFavouritesValues(), HttpStatus.OK);
    }
}
