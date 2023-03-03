package com.seventh.lotoapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.EntreprisePlanPermission} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlanPermissionDTO implements Serializable {

    private Long id;

    private String description;

    private EntreprisePlanDTO entreprisePlan;

    private StateDTO state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EntreprisePlanDTO getEntreprisePlan() {
        return entreprisePlan;
    }

    public void setEntreprisePlan(EntreprisePlanDTO entreprisePlan) {
        this.entreprisePlan = entreprisePlan;
    }

    public StateDTO getState() {
        return state;
    }

    public void setState(StateDTO state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlanPermissionDTO)) {
            return false;
        }

        EntreprisePlanPermissionDTO entreprisePlanPermissionDTO = (EntreprisePlanPermissionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entreprisePlanPermissionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlanPermissionDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", entreprisePlan=" + getEntreprisePlan() +
            ", state=" + getState() +
            "}";
    }
}
