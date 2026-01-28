package com.example.backend.model;
import lombok.*;
import java.util.List;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    private String id;
    private String name;
    private String instructions;
    private String image;
    private Integer timeMinutes;
    private List<RecipeIngredient> ingredients = new ArrayList<>();
}