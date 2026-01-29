package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecipeIngredient {
    private String ingredientId;
    private String name;
    private Integer quantity;
    private Unit unit;
    private boolean isAnimal;
}
