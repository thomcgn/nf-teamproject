package com.example.backend.dto;

public record IngredientResponse(
        String id,
        String name,
        boolean isAnimal
) {
}
