package com.seventh.lotoapp.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.RequestTransaction} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RequestTransactionDTO implements Serializable {

    private Long id;

    @NotNull
    private String description;

    private Instant dateTransaction;

    private EntreprisePlanSaleDTO entreprisePlanSale;

    private EntrepriseDTO entreprise;

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

    public Instant getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(Instant dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public EntreprisePlanSaleDTO getEntreprisePlanSale() {
        return entreprisePlanSale;
    }

    public void setEntreprisePlanSale(EntreprisePlanSaleDTO entreprisePlanSale) {
        this.entreprisePlanSale = entreprisePlanSale;
    }

    public EntrepriseDTO getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDTO entreprise) {
        this.entreprise = entreprise;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestTransactionDTO)) {
            return false;
        }

        RequestTransactionDTO requestTransactionDTO = (RequestTransactionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, requestTransactionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RequestTransactionDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", dateTransaction='" + getDateTransaction() + "'" +
            ", entreprisePlanSale=" + getEntreprisePlanSale() +
            ", entreprise=" + getEntreprise() +
            "}";
    }
}
