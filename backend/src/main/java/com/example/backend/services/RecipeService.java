package com.example.backend.services;

import com.example.backend.dto.RecipeRequest;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.exceptions.DuplicateItemException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.exceptions.ValidationException;
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
        RecipeRequest normalized = normalizeRecipeRequest(recipeRequest);
        validateRecipeRequest(normalized);

        if (getRecipeByName(normalized.name()).isPresent()) {
            throw new DuplicateItemException(
                    "Recipe with name: " + normalized.name() + " already exists"
            );
        }

        Recipe recipe = recipeRepository.save(
                new Recipe(
                        null,
                        normalized.name(),
                        normalized.instructions(),
                        normalized.image(),
                        normalized.timeMinutes(),
                        normalized.ingredients()
                )
        );

        return mapper.toRecipeResponse(recipe);
    }

    public RecipeResponse updateRecipe(String id, RecipeRequest recipeRequest) {
        RecipeRequest normalized = normalizeRecipeRequest(recipeRequest);
        validateRecipeRequest(normalized);

        Recipe recipeToUpdate = recipeRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Recipe with id: " + id + " not found!")
                );

        recipeToUpdate.setName(normalized.name());
        recipeToUpdate.setInstructions(normalized.instructions());
        recipeToUpdate.setImage(normalized.image());
        recipeToUpdate.setTimeMinutes(normalized.timeMinutes());
        recipeToUpdate.setIngredients(normalized.ingredients());

        return mapper.toRecipeResponse(recipeRepository.save(recipeToUpdate));
    }

    private RecipeRequest normalizeRecipeRequest(RecipeRequest request) {
        return new RecipeRequest(
                normalizeString(request.name()),
                normalizeString(request.instructions()),
                request.image() == null ? null : request.image().trim(),
                request.timeMinutes(),
                request.ingredients()
        );
    }

    private String normalizeString(String value) {
        if (value == null) return null;
        return value.trim().replaceAll("\\s+", " ");
    }

    private void validateRecipeRequest(RecipeRequest request) {
        if (request == null) {
            throw new ValidationException("Recipe request cannot be null");
        }

        if (request.name() == null || request.name().isBlank()) {
            throw new ValidationException("Recipe name cannot be empty");
        }

        if (request.instructions() == null || request.instructions().isBlank()) {
            throw new ValidationException("Instructions cannot be empty");
        }

        if (request.timeMinutes() <= 0) {
            throw new ValidationException("Cooking time must be greater than 0");
        }

        if (request.ingredients() == null || request.ingredients().isEmpty()) {
            throw new ValidationException("Recipe must contain at least one ingredient");
        }
    }

}
