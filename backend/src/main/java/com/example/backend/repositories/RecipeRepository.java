package com.example.backend.repositories;

import com.example.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    Optional<Recipe> findByName(String name);
}
