package com.toctoc.repo;

import com.toctoc.models.UserHistory;

import java.util.Map;
import java.util.Set;

public interface UserHistoryRepository extends BaseMongoRepository<UserHistory> {

    public Map<String, String> getUserHistoryByUserId(String userId);

    public Set<String> getFavouritesByUserId(String userId);

    public UserHistory getByUserId(String userId);

}
