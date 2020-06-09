package com.toctoc.controller;

import com.toctoc.models.UserHistory;
import com.toctoc.repo.UserHistoryRepository;
import com.toctoc.repo.UserRepository;
import com.toctoc.service.UserHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
            historyService.save(new UserHistory(user.getId(), historyMap, new HashSet<>()));
        } else {
            var currentTime = java.time.Instant.now().toString();
            history.getHistory().put(currentTime, recipeId);
            historyService.save(history);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/favourite/{email}/{recipeId}")
    public ResponseEntity postFavourite(@PathVariable String email, @PathVariable String recipeId) {
        var user = userRepository.getUserByEmail(email);
        var history = historyService.getByUserId(user.getId());

        if (history == null) {
            Set<String> favourites = new HashSet<>();
            favourites.add(recipeId);
            Map<String, String> historyMap = new HashMap<>();
            historyService.save(new UserHistory(user.getId(), historyMap, favourites));
        } else {
            history.getFavourites().add(recipeId);
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
        Set<String> favourites = history.getFavourites();
        List<String> result = new ArrayList<>(favourites);
        Collections.reverse(result);
        return new ResponseEntity<List>(result, HttpStatus.OK);
    }

    @GetMapping("/{email}/isFavourite/{id}")
    public ResponseEntity<Boolean> isFavourite(@PathVariable String email, @PathVariable String id) {
        var user = userRepository.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        return new ResponseEntity<>(this.historyService.isFavourite(user.getId(), id), HttpStatus.OK);
    }

    @DeleteMapping("/{email}/delete/{id}")
    public boolean deleteFavourite(@PathVariable String email, @PathVariable String id) {
        var user = userRepository.getUserByEmail(email);
        if (user == null) {
            return false;
        }
        return this.historyService.removeFavourite(user.getId(), id);
    }
}

