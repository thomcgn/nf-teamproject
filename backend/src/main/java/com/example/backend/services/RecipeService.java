package com.example.backend.services;

import com.example.backend.dto.RecipeResponse;
import com.example.backend.mapper.RecipeMapper;
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

}
