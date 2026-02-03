package com.example.backend.controller;


import com.example.backend.dto.RecipeRequest;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.exceptions.DuplicateItemException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.model.RecipeIngredient;
import com.example.backend.model.Unit;
import com.example.backend.services.RecipeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
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

        when(recipeService.getAllRecipes()).thenReturn(List.of(recipe));

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

        when(recipeService.getRecipeById("1")).thenReturn(Optional.of(recipe));

        mockMvc.perform(get("/api/recipe/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Pizza"))
                .andExpect(jsonPath("$.timeMinutes").value(30));
    }

    @Test
    void getRecipeById_shouldReturn404_whenNotFound() throws Exception {
        when(recipeService.getRecipeById("42")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/recipe/42"))
                .andExpect(status().isNotFound());
    }

    @Test
    void addRecipe_shouldReturnCreatedRecipe() throws Exception {
        RecipeIngredient ingredient = new RecipeIngredient("1", "Tomate", 5, Unit.PIECE, false);
        RecipeResponse recipe = new RecipeResponse(
                "1",
                "Pasta",
                "Kochen, essen",
                "image.jpg",
                20,
                List.of(ingredient)
        );

        when(recipeService.addRecipe(Mockito.any())).thenReturn(recipe);

        mockMvc.perform(post("/api/recipe")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("""
                                {
                                    "name": "Pasta",
                                    "instructions": "Kochen, essen",
                                    "image": "image.jpg",
                                    "timeMinutes": 20,
                                    "ingredients": [
                                        {
                                            "ingredientId":"1",
                                            "name":"Tomate",
                                            "quantity":5,
                                            "unit":"PIECE",
                                            "animal":false
                                        }
                                     ]
                                }
                            """)
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.name").value("Pasta"))
                .andExpect(jsonPath("$.image").value("image.jpg"))
                .andExpect(jsonPath("$.timeMinutes").value(20))
                .andExpect(jsonPath("$.ingredients[0].name").value("Tomate"));
    }

    @Test
    void addRecipe_shouldReturn409_whenDuplicate() throws Exception {
       when(recipeService.addRecipe(Mockito.any()))
                .thenThrow(new DuplicateItemException("Recipe with name: Pasta already exists"));

        mockMvc.perform(post("/api/recipe")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Pasta",
                                    "instructions": "Kochen, essen",
                                    "image": "image.jpg",
                                    "timeMinutes": 20,
                                    "ingredients": [
                                        {
                                            "ingredientId":"1",
                                            "name":"Tomate",
                                            "quantity":5,
                                            "unit":"PIECE",
                                            "animal":false
                                        }
                                     ]
                                }
                                """)
                )
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.errorMessage").value("Recipe with name: Pasta already exists"));
    }

    @Test
    void updateRecipe_shouldReturnUpdatedRecipe() throws Exception {
        RecipeIngredient ingredient = new RecipeIngredient(
                "1",
                "Tomate",
                5,
                Unit.PIECE,
                false
        );

        RecipeRequest updateRequest = new RecipeRequest(
                "Updated Pasta",
                "Updated instructions",
                "updated.jpg",
                25,
                List.of(ingredient)
        );

        RecipeResponse updatedRecipe = new RecipeResponse(
                "1",
                "Updated Pasta",
                "Updated instructions",
                "updated.jpg",
                25,
                List.of(ingredient)
        );

        when(recipeService.updateRecipe("1", updateRequest))
                .thenReturn(updatedRecipe);

        mockMvc.perform(put("/api/recipe/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "name": "Updated Pasta",
                            "instructions": "Updated instructions",
                            "image": "updated.jpg",
                            "timeMinutes": 25,
                            "ingredients": [
                                {
                                    "ingredientId": "1",
                                    "name": "Tomate",
                                    "quantity": 5,
                                    "unit": "PIECE",
                                    "animal": false
                                }
                            ]
                        }
                    """)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated Pasta"))
                .andExpect(jsonPath("$.image").value("updated.jpg"))
                .andExpect(jsonPath("$.timeMinutes").value(25))
                .andExpect(jsonPath("$.ingredients[0].name").value("Tomate"));
    }

    @Test
    void updateRecipe_shouldReturn404_whenNotFound() throws Exception {
        when(recipeService.updateRecipe(Mockito.eq("42"), Mockito.any()))
                .thenThrow(new NotFoundException("Recipe with id: 42 not found"));

        mockMvc.perform(put("/api/recipe/42")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "name": "Pasta",
                            "instructions": "Kochen",
                            "timeMinutes": 20,
                            "ingredients": []
                        }
                    """)
                )
                .andExpect(status().isNotFound());
    }


    @Test
    void deleteRecipe_shouldReturn404_whenRecipeNotFound()  throws Exception {
        doThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found"))
                .when(recipeService).deleteRecipe("missing");

        mockMvc.perform(delete("/api/recipe/{id}", "missing"))
                .andExpect(status().isNotFound());

        verify(recipeService).deleteRecipe("missing");
    }

    @Test
    void deleteRecipe_shouldReturn204_whenSuccessful()  throws Exception {
        mockMvc.perform(delete("/api/recipe/{id}", "123"))
                .andExpect(status().isNoContent());

        verify(recipeService).deleteRecipe("123");
    }
}
