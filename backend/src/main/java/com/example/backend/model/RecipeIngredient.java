package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredient {
    private String ingredientId;
    private String name;
    private Integer quantity;
    private Unit unit;
    private boolean isAnimal;

    @JsonProperty("isAnimal")
    public boolean getIsAnimal() {
        return isAnimal;
    }

    public void setIsAnimal(boolean isAnimal) {
        this.isAnimal = isAnimal;
    }
}
