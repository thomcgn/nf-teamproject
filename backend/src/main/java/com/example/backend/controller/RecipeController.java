package com.example.backend.controller;

import com.example.backend.dto.RecipeRequest;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {this.recipeService = recipeService;}

    @GetMapping
    public List<RecipeResponse> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeResponse addRecipe(@RequestBody RecipeRequest recipeRequest) {
        return recipeService.addRecipe(recipeRequest);
    }

    @PutMapping("/{id}")
    public RecipeResponse updateRecipe(@PathVariable String id, @RequestBody RecipeRequest recipeRequest) {
        return recipeService.updateRecipe(id, recipeRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
    }

}
