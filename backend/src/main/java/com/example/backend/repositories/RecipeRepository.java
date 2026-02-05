package com.example.backend.repositories;

import com.example.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    Optional<Recipe> findByName(String name);

    List<Recipe> findByNameContainsIgnoreCase(String nameRegex);

    @Query("{ 'ingredients.ingredientId': { $all: ?0 } }")
    List<Recipe> findByIngredientIdsAll(List<String> ingredientIds);

    @Query("""
      {
        'name': { $regex: ?0, $options: 'i' },
        'ingredients.ingredientId': { $all: ?1 }
      }
    """)
    List<Recipe> findByNameAndIngredientIdsAll(String name, List<String> ingredientIds);
}
