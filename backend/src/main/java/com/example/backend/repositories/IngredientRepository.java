package com.example.backend.repositories;

import com.example.backend.model.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends MongoRepository<Ingredient, String> {
    Optional<Ingredient> findByName(String name);

    List<Ingredient> findAllByOrderByNameAsc();

    List<Ingredient> findByNameContainingIgnoreCaseOrderByNameAsc(String q);

    boolean existsByNameIgnoreCase(String name);
}
