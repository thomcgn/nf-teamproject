package com.example.backend.services;

import com.example.backend.dto.RecipeResponse;
import com.example.backend.mapper.RecipeMapper;
import com.example.backend.model.Recipe;
import com.example.backend.repositories.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {
    @Mock
    private RecipeRepository recipeRepository;

    @Mock
    RecipeMapper mapper;

    @InjectMocks
    private RecipeService recipeService;

    @Test
    void getRecipeById_shouldReturnRecipe_whenRecipeExists() {
        Recipe recipe = new Recipe(
                "1",
                "Pasta",
                "test",
                "test",
                20,
                List.of()
        );

        RecipeResponse response = new RecipeResponse("1", "Pasta", "test", "test", 20, List.of());

        when(recipeRepository.findById("1")).thenReturn(Optional.of(recipe));
        when(mapper.toRecipeResponse(recipe)).thenReturn(response);

        Optional<RecipeResponse> result = recipeService.getRecipeById("1");

        assertTrue(result.isPresent());
        assertEquals("1", result.get().id());
        assertEquals("Pasta", result.get().name());
    }

    @Test
    void getRecipeById_returnsEmpty_whenMissing() {
        when(recipeRepository.findById("1")).thenReturn(Optional.empty());

        Optional<RecipeResponse> result = recipeService.getRecipeById("1");
        assertTrue(result.isEmpty());
    }


    @Test
    void deleteCharacter_shouldDeleteCharacter_whenSuccessful() {
        when(recipeRepository.existsById("1")).thenReturn(true);

        recipeService.deleteRecipe("1");
        verify(recipeRepository).existsById("1");
        verify(recipeRepository).deleteById("1");
    }

    @Test
    void deleteCharacter_shouldThrowException_whenCharacterNotFound() {
        when(recipeRepository.existsById("1")).thenReturn(false);

        assertThrows(ResponseStatusException.class, () -> recipeService.deleteRecipe("1"));

        verify(recipeRepository).existsById("1");
        verify(recipeRepository, never()).deleteById(anyString());
    }

}