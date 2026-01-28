package com.example.model;

public enum Unit {
    G("g"),
    KG("kg"),
    ML("ml"),
    L("l"),

    TSP("tsp"),
    TBSP("tbsp"),
    CUP("cup"),

    PIECE("piece"),
    PINCH("pinch"),
    SLICE("slice"),
    CLOVE("clove"),

    TO_TASTE("to taste"),
    AS_NEEDED("as needed");

    private final String display;

    Unit(String display) {
        this.display = display;
    }

    public String getDisplay() {
        return display;
    }
    }
