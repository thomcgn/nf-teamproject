package com.example.backend.services;

import com.example.backend.dto.RecipeRequest;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.exceptions.DuplicateItemException;
import com.example.backend.mapper.RecipeMapper;
import com.example.backend.model.Recipe;
import com.example.backend.repositories.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeMapper mapper;

    public List<RecipeResponse> getAllRecipes() {
        return recipeRepository.findAll().stream().map(mapper::toRecipeResponse).toList();
    }
    public Optional<RecipeResponse> getRecipeById(String id) {
        return recipeRepository.findById(id).map(mapper::toRecipeResponse);
    }

    public Optional<RecipeResponse> getRecipeByName(String recipeName) {
        return recipeRepository.findByName(recipeName).map(mapper::toRecipeResponse);
    }

    public RecipeResponse addRecipe(RecipeRequest recipeRequest) {
        if(getRecipeByName(recipeRequest.name().trim()).isPresent()) {
            throw new DuplicateItemException("Recipe with name: "+ recipeRequest.name() + " already exists");
        }

        Recipe recipe = recipeRepository.save(
                new Recipe(
                        null,
                        recipeRequest.name().trim(),
                        recipeRequest.instructions(),
                        recipeRequest.image(),
                        recipeRequest.timeMinutes(),
                        recipeRequest.ingredients()
                )
        );

        return mapper.toRecipeResponse(recipe);
    }
}
