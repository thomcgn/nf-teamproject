package com.example.backend.controller;


import com.example.backend.dto.RecipeResponse;
import com.example.backend.model.RecipeIngredient;
import com.example.backend.model.Unit;
import com.example.backend.services.RecipeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipeService recipeService;

    @Test
    void getAllRecipes_shouldReturnRecipes() throws Exception {
        RecipeIngredient ingredient = new RecipeIngredient("1", "Tomate",5, Unit.PIECE,false);

        RecipeResponse recipe = new RecipeResponse(
                "1",
                "Pasta",
                "Kochen, essen",
                "image.jpg",
                20,
                List.of(ingredient)
        );

        Mockito.when(recipeService.getAllRecipes()).thenReturn(List.of(recipe));

        mockMvc.perform(get("/api/recipe"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].name").value("Pasta"))
                .andExpect(jsonPath("$[0].timeMinutes").value(20))
                .andExpect(jsonPath("$[0].ingredients[0].name").value("Tomate"));
    }

    @Test
    void getRecipeById_shouldReturnRecipe_whenFound() throws Exception {
        RecipeResponse recipe = new RecipeResponse(
                "1",
                "Pizza",
                "Backen",
                "pizza.jpg",
                30,
                List.of()
        );

        Mockito.when(recipeService.getRecipeById("1")).thenReturn(Optional.of(recipe));

        mockMvc.perform(get("/api/recipe/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Pizza"))
                .andExpect(jsonPath("$.timeMinutes").value(30));
    }

    @Test
    void getRecipeById_shouldReturn404_whenNotFound() throws Exception {
        Mockito.when(recipeService.getRecipeById("42")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/recipe/42"))
                .andExpect(status().isNotFound());
    }
}
