package com.toctoc;

import com.toctoc.models.RecipeView;
import com.toctoc.repo.RecipeViewsRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
//@EnableElasticsearchRepositories
@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class})
public class TocTocApplication {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    public static void main(String[] args) {
        SpringApplication.run(TocTocApplication.class, args);
    }

}
