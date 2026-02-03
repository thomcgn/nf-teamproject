package com.example.backend.services;

import com.example.backend.repositories.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {
    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeService recipeService;

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