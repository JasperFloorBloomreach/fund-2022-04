package org.example.mixin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hippoecm.hst.core.container.HstComponentWindow;
import org.hippoecm.hst.pagemodelapi.v09.core.model.ComponentWindowModel;
import training.standardfeatures.answer._04.ComponentNameConverter;

public abstract class ComponentWindowModelMixin extends ComponentWindowModel {

    public ComponentWindowModelMixin(final HstComponentWindow window) {
        super(window);
    }

    @JsonIgnore
    @Override
    public String getComponentClass() {
        return super.getComponentClass();
    }

    @JsonSerialize(converter= ComponentNameConverter.class)
    @Override
    public String getName() {
        return super.getName();
    }
}
