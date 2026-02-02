package com.example.backend.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("ingredients")
public class Ingredient {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private boolean isAnimal;
}