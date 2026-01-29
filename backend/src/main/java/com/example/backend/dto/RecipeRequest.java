package com.example.backend.dto;

import com.example.backend.model.RecipeIngredient;
import java.util.List;

public record RecipeRequest(
        String name,
        String instructions,
        String image,
        Integer timeMinutes,
        List<RecipeIngredient> ingredients
) {
}
