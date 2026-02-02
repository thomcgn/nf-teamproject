package com.example.backend.controller;


import com.example.backend.dto.IngredientRequest;
import com.example.backend.dto.IngredientResponse;
import com.example.backend.services.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService service;

    @PostMapping
    public IngredientResponse addIngredient(@RequestBody IngredientRequest req) {
        return service.addIngredient(req);
    }

    @GetMapping
    public List<IngredientResponse> getAllIngredients(
            @RequestParam(required = false) String q
    ) {
        return service.getAllIngredients(q);
    }
}
