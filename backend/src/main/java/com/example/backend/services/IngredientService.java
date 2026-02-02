package com.example.backend.services;

import com.example.backend.dto.IngredientRequest;
import com.example.backend.dto.IngredientResponse;
import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class IngredientService {
    private final IngredientRepository repo;


    public IngredientResponse addIngredient(IngredientRequest request) {
        String normalized = normalizeName(request.name());

        Ingredient existing = repo.findByName(normalized).orElse(null);
        if (existing != null) {
            return toResponse(existing);
        }
        if (repo.existsByNameIgnoreCase(normalized)) {
            throw new DuplicateKeyException("Ingredient already exists");
        }

        Ingredient ingredient = new Ingredient();
        ingredient.setName(normalized);
        ingredient.setAnimal(request.isAnimal());

        Ingredient saved = repo.save(ingredient);
        return toResponse(saved);
    }

    public List<IngredientResponse> getAllIngredients(String q) {
        if (q == null || q.isBlank()) {
            return repo.findAllByOrderByNameAsc()
                    .stream()
                    .map(this::toResponse)
                    .toList();
        }

        String query = q.trim();
        return repo.findByNameContainingIgnoreCaseOrderByNameAsc(query)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private IngredientResponse toResponse(Ingredient i) {
        return new IngredientResponse(i.getId(), i.getName(), i.isAnimal());
    }

    private String normalizeName(String raw) {
        if (raw == null) throw new IllegalArgumentException("Name cannot be null");
        String s = raw.trim().replaceAll("\\s+", " ").toLowerCase();
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }
}
