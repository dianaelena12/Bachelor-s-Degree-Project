package com.toctoc.repo;

import com.toctoc.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseMongoRepository<User> {
}
