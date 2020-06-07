package com.toctoc.repo;

import com.toctoc.models.UserHistory;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public interface UserHistoryRepository extends BaseMongoRepository<UserHistory> {

    public Map<String, String> getUserHistoryByUserId(String userId);

    public Map<String, String> getFavouritesByUserId(String userId);

    public UserHistory getByUserId(String userId);

}
