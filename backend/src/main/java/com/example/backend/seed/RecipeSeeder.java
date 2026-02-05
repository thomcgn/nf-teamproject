package com.example.backend.seed;

import com.example.backend.model.Recipe;
import com.example.backend.model.RecipeIngredient;
import com.example.backend.model.Unit;
import com.example.backend.repositories.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;
import java.util.UUID;

@Profile("!test")
@Configuration
public class RecipeSeeder {

    @Bean
    CommandLineRunner seedRecipes(RecipeRepository recipeRepository) {
        return args -> {

            if (recipeRepository.count() > 0) return;

            Recipe r1 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Spaghetti Carbonara",
                    "Boil pasta. Fry bacon. Mix eggs and cheese. Combine all.",
                    "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
                    20,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Spaghetti", 200, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Eggs", 2, Unit.PIECE, true),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Parmesan", 50, Unit.G, true)
                    )
            );

            Recipe r2 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Avocado Toast",
                    "Toast bread. Mash avocado. Add salt and pepper.",
                    "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
                    10,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Bread", 2, Unit.SLICE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Avocado", 1, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Salt", 1, Unit.PINCH, false)
                    )
            );

            Recipe r3 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Pancakes",
                    "Mix ingredients. Fry on pan until golden.",
                    "https://images.unsplash.com/photo-1587731073068-8eab5bcd6f4a",
                    15,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Flour", 200, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Milk", 200, Unit.ML, true),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Egg", 2, Unit.PIECE, true)
                    )
            );

            Recipe r4 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Greek Salad",
                    "Chop vegetables. Add feta and olive oil.",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
                    10,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Tomato", 2, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Cucumber", 1, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Feta Cheese", 100, Unit.G, true)
                    )
            );

            Recipe r5 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Tomato Soup",
                    "Boil tomatoes. Blend. Add spices.",
                    "https://images.unsplash.com/photo-1604908177225-2c8e1b6f845d",
                    25,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Tomato", 500, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Onion", 1, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Garlic", 2, Unit.CLOVE, false)
                    )
            );

            Recipe r6 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Fruit Smoothie",
                    "Blend all ingredients until smooth.",
                    "https://images.unsplash.com/photo-1553530666-ba11a90a0860",
                    5,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Banana", 1, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Strawberries", 100, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Milk", 250, Unit.ML, true)
                    )
            );

            Recipe r7 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Grilled Cheese Sandwich",
                    "Butter bread. Add cheese. Grill until melted.",
                    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
                    8,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Bread", 2, Unit.SLICE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Cheese", 2, Unit.SLICE, true),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Butter", 1, Unit.TBSP, true)
                    )
            );

            Recipe r8 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Omelette",
                    "Beat eggs. Fry with salt and pepper.",
                    "https://images.unsplash.com/photo-1553163147-622ab57be1c7",
                    7,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Eggs", 3, Unit.PIECE, true),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Salt", 1, Unit.PINCH, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Pepper", 1, Unit.PINCH, false)
                    )
            );

            Recipe r9 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Pasta Bolognese",
                    "Cook pasta. Prepare sauce. Combine.",
                    "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
                    30,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Pasta", 200, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Minced Meat", 200, Unit.G, true),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Tomato Sauce", 200, Unit.ML, false)
                    )
            );

            Recipe r10 = new Recipe(
                    UUID.randomUUID().toString(),
                    "Vegetable Stir Fry",
                    "Stir fry vegetables with oil and soy sauce.",
                    "https://images.unsplash.com/photo-1604908177522-0509d4ec1bde",
                    15,
                    List.of(
                            new RecipeIngredient(UUID.randomUUID().toString(), "Broccoli", 150, Unit.G, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Carrot", 1, Unit.PIECE, false),
                            new RecipeIngredient(UUID.randomUUID().toString(), "Soy Sauce", 2, Unit.TBSP, false)
                    )
            );

            recipeRepository.saveAll(List.of(
                    r1, r2, r3, r4, r5, r6, r7, r8, r9, r10
            ));
        };
    }

}
