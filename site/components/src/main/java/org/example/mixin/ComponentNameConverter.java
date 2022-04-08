package org.example.mixin;

import com.fasterxml.jackson.databind.util.StdConverter;

public class ComponentNameConverter extends StdConverter<String, String> {
    @Override
    public String convert(final String value) {
        //todo: implement this feature, strip away numeric characters in string
        return value.replaceAll("\\d", "");
    }
}
