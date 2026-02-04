package com.example.backend.services;

import com.example.backend.dto.IngredientRequest;
import com.example.backend.dto.IngredientResponse;
import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class IngredientServiceTest {

    @Mock
    private IngredientRepository repo;

    @InjectMocks
    private IngredientService service;

    @Test
    void addIngredient_shouldReturnExistingIngredient_whenExactNormalizedNameExists() {
        IngredientRequest req = new IngredientRequest("  tOMaTo  ", false);
        Ingredient existing = new Ingredient("1", "Tomato", false);

        when(repo.findByName("Tomato")).thenReturn(Optional.of(existing));

        IngredientResponse actual = service.addIngredient(req);

        assertThat(actual).isEqualTo(new IngredientResponse("1", "Tomato", false));
        verify(repo).findByName("Tomato");

        verify(repo, never()).existsByNameIgnoreCase(anyString());
        verify(repo, never()).save(any());
        verifyNoMoreInteractions(repo);
    }

    @Test
    void addIngredient_shouldThrowDuplicateKeyException_whenNameExistsIgnoringCase() {
        IngredientRequest req = new IngredientRequest("  TOMATO ", false);

        // no exact match after normalization, but exists ignoring case
        when(repo.findByName("Tomato")).thenReturn(Optional.empty());
        when(repo.existsByNameIgnoreCase("Tomato")).thenReturn(true);

        assertThrows(DuplicateKeyException.class, () -> service.addIngredient(req));

        verify(repo).findByName("Tomato");
        verify(repo).existsByNameIgnoreCase("Tomato");
        verify(repo, never()).save(any());
        verifyNoMoreInteractions(repo);
    }

    @Test
    void addIngredient_shouldNormalizeNameAndSave_whenIngredientDoesNotExist() {
        IngredientRequest req = new IngredientRequest("  soY   milk  ", true);

        when(repo.findByName("Soy milk")).thenReturn(Optional.empty());
        when(repo.existsByNameIgnoreCase("Soy milk")).thenReturn(false);

        when(repo.save(any(Ingredient.class))).thenAnswer(inv -> {
            Ingredient arg = inv.getArgument(0);
            arg.setId("generated-id");
            return arg;
        });

        IngredientResponse actual = service.addIngredient(req);

        ArgumentCaptor<Ingredient> captor = ArgumentCaptor.forClass(Ingredient.class);
        verify(repo).save(captor.capture());
        Ingredient saved = captor.getValue();

        assertThat(saved.getId()).isEqualTo("generated-id");
        assertThat(saved.getName()).isEqualTo("Soy milk"); // normalized
        assertThat(saved.isAnimal()).isTrue(); // from request

        assertThat(actual).isEqualTo(new IngredientResponse("generated-id", "Soy milk", true));

        verify(repo).findByName("Soy milk");
        verify(repo).existsByNameIgnoreCase("Soy milk");
        verifyNoMoreInteractions(repo);
    }

    @Test
    void addIngredient_shouldThrowIllegalArgumentException_whenNameIsNull() {
        IngredientRequest req = new IngredientRequest(null, false);

        assertThrows(IllegalArgumentException.class, () -> service.addIngredient(req));

        verifyNoInteractions(repo);
    }

    @Test
    void getAllIngredients_shouldReturnAllIngredients_whenQueryIsNull() {
        Ingredient i1 = new Ingredient("1", "Apple", false);
        Ingredient i2 = new Ingredient("2", "Milk", true);

        when(repo.findAllByOrderByNameAsc()).thenReturn(List.of(i1, i2));

        List<IngredientResponse> actual = service.getAllIngredients(null);

        assertThat(actual).isEqualTo(List.of(
                new IngredientResponse("1", "Apple", false),
                new IngredientResponse("2", "Milk", true)
        ));

        verify(repo).findAllByOrderByNameAsc();
        verify(repo, never()).findByNameContainingIgnoreCaseOrderByNameAsc(anyString());
        verifyNoMoreInteractions(repo);
    }

    @Test
    void getAllIngredients_shouldReturnAllIngredients_whenQueryIsBlank() {
        when(repo.findAllByOrderByNameAsc()).thenReturn(List.of());

        List<IngredientResponse> actual = service.getAllIngredients("   ");

        assertThat(actual).isEmpty();

        verify(repo).findAllByOrderByNameAsc();
        verify(repo, never()).findByNameContainingIgnoreCaseOrderByNameAsc(anyString());
        verifyNoMoreInteractions(repo);
    }

    @Test
    void getAllIngredients_shouldReturnFilteredIngredients_whenQueryProvided() {
        Ingredient i1 = new Ingredient("1", "Tomato", false);
        Ingredient i2 = new Ingredient("2", "Tomato paste", false);

        when(repo.findByNameContainingIgnoreCaseOrderByNameAsc("to"))
                .thenReturn(List.of(i1, i2));

        List<IngredientResponse> actual = service.getAllIngredients("  to ");

        assertThat(actual).isEqualTo(List.of(
                new IngredientResponse("1", "Tomato", false),
                new IngredientResponse("2", "Tomato paste", false)
        ));

        verify(repo, never()).findAllByOrderByNameAsc();
        verify(repo).findByNameContainingIgnoreCaseOrderByNameAsc("to");
        verifyNoMoreInteractions(repo);
    }
}
