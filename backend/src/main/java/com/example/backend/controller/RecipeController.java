package com.example.backend.controller;

import com.example.backend.dto.RecipeResponse;
import com.example.backend.services.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {this.recipeService = recipeService;}

    @GetMapping("/recipe")
    public List<RecipeResponse> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
    @GetMapping("/recipe/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
