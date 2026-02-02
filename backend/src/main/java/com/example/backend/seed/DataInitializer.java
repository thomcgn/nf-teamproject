package com.example.backend.seed;

import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedIngredients(IngredientRepository ingredientRepository) {
        return args -> {

            if (ingredientRepository.count() > 0) {
                System.out.println("Ingredients already seeded.");
                return;
            }

            List<Ingredient> ingredients = List.of(
                    new Ingredient(null, "Tomato", false),
                    new Ingredient(null, "Onion", false),
                    new Ingredient(null, "Garlic", false),
                    new Ingredient(null, "Potato", false),
                    new Ingredient(null, "Carrot", false),
                    new Ingredient(null, "Bell pepper", false),
                    new Ingredient(null, "Cucumber", false),
                    new Ingredient(null, "Broccoli", false),
                    new Ingredient(null, "Spinach", false),
                    new Ingredient(null, "Mushroom", false),

                    new Ingredient(null, "Rice", false),
                    new Ingredient(null, "Pasta", false),
                    new Ingredient(null, "Flour", false),
                    new Ingredient(null, "Sugar", false),
                    new Ingredient(null, "Salt", false),
                    new Ingredient(null, "Olive oil", false),
                    new Ingredient(null, "Soy sauce", false),
                    new Ingredient(null, "Lentils", false),
                    new Ingredient(null, "Chickpeas", false),
                    new Ingredient(null, "Beans", false),

                    new Ingredient(null, "Apple", false),
                    new Ingredient(null, "Banana", false),
                    new Ingredient(null, "Orange", false),
                    new Ingredient(null, "Strawberry", false),
                    new Ingredient(null, "Lemon", false),

                    new Ingredient(null, "Milk", true),
                    new Ingredient(null, "Butter", true),
                    new Ingredient(null, "Cheese", true),
                    new Ingredient(null, "Yogurt", true),
                    new Ingredient(null, "Egg", true),
                    new Ingredient(null, "Chicken", true),
                    new Ingredient(null, "Beef", true),
                    new Ingredient(null, "Pork", true),
                    new Ingredient(null, "Fish", true),
                    new Ingredient(null, "Shrimp", true),

                    new Ingredient(null, "Honey", true),
                    new Ingredient(null, "Cream", true),
                    new Ingredient(null, "Bacon", true),
                    new Ingredient(null, "Sausage", true),
                    new Ingredient(null, "Ham", true)
            );

            ingredientRepository.saveAll(ingredients);
            System.out.println("Seeded " + ingredients.size() + " ingredients.");
        };
    }
}

