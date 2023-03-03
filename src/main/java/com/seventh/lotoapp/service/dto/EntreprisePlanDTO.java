package com.seventh.lotoapp.service.dto;

import com.seventh.lotoapp.domain.enumeration.TypePlan;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.EntreprisePlan} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlanDTO implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal prix;

    @NotNull
    private String name;

    @NotNull
    private TypePlan type;

    private String avantage;

    private Long requestPerDay;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypePlan getType() {
        return type;
    }

    public void setType(TypePlan type) {
        this.type = type;
    }

    public String getAvantage() {
        return avantage;
    }

    public void setAvantage(String avantage) {
        this.avantage = avantage;
    }

    public Long getRequestPerDay() {
        return requestPerDay;
    }

    public void setRequestPerDay(Long requestPerDay) {
        this.requestPerDay = requestPerDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlanDTO)) {
            return false;
        }

        EntreprisePlanDTO entreprisePlanDTO = (EntreprisePlanDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entreprisePlanDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlanDTO{" +
            "id=" + getId() +
            ", prix=" + getPrix() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", avantage='" + getAvantage() + "'" +
            ", requestPerDay=" + getRequestPerDay() +
            "}";
    }
}
