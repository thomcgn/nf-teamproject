package com.example.backend.mapper;

import com.example.backend.dto.RecipeResponse;
import com.example.backend.model.Recipe;
import org.springframework.stereotype.Component;

@Component
public class RecipeMapper {

    public RecipeResponse toRecipeResponse(Recipe recipe) {
        return new RecipeResponse(
                recipe.getId(),
                recipe.getName(),
                recipe.getInstructions(),
                recipe.getImage(),
                recipe.getTimeMinutes(),
                recipe.getIngredients()
        );
    }
}
