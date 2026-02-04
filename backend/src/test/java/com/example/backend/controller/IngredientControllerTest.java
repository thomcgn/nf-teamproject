package com.example.backend.controller;

import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class IngredientControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IngredientRepository repo;

    @AfterEach
    void cleanDb() {
        repo.deleteAll();
    }


    @Test
    void getAllIngredients_shouldReturnAllIngredients_whenCalledWithoutQuery() throws Exception {
        Ingredient ingredient1 = new Ingredient("1", "Tomato", false);
        Ingredient ingredient2 = new Ingredient("2", "Milk", true);
        repo.saveAll(List.of(ingredient1, ingredient2));

        mockMvc.perform(get("/api/ingredients"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                          { "id": "1", "name": "Tomato", "animal": false },
                          { "id": "2", "name": "Milk", "animal": true }
                        ]
                        """));
    }

    @Test
    void getAllIngredients_shouldPassQueryParamToService_whenQueryIsProvided() throws Exception {
        Ingredient ingredient1 = new Ingredient("1", "Tomato", false);
        Ingredient ingredient2 = new Ingredient("2", "Milk", true);
        repo.saveAll(List.of(ingredient1, ingredient2));

        mockMvc.perform(get("/api/ingredients").param("q", "to"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                          { "id": "1", "name": "Tomato", "animal": false }
                        ]
                        """));
    }

    @Test
    @WithMockUser
    void addIngredient_shouldReturnCreatedIngredient_whenSuccessful() throws Exception {
        mockMvc.perform(post("/api/ingredients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "name": "Tofu",
                                "animal": false
                            }
                        """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        { "name": "Tofu", "animal": false }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());

    }


}