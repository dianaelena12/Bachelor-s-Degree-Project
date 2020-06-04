package com.toctoc.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseMongoRepository<T> extends MongoRepository<T, String> {

    public T getById(String id);
}
