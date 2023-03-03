package com.seventh.lotoapp.service.dto;

import com.seventh.lotoapp.domain.enumeration.PlanStatut;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.EntreprisePlanSale} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlanSaleDTO implements Serializable {

    private Long id;

    @NotNull
    private String token;

    private Instant startDate;

    private Instant expirateDate;

    @NotNull
    private PlanStatut statut;

    private EntrepriseDTO entreprise;

    private EntreprisePlanDTO entreprisePlan;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getExpirateDate() {
        return expirateDate;
    }

    public void setExpirateDate(Instant expirateDate) {
        this.expirateDate = expirateDate;
    }

    public PlanStatut getStatut() {
        return statut;
    }

    public void setStatut(PlanStatut statut) {
        this.statut = statut;
    }

    public EntrepriseDTO getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDTO entreprise) {
        this.entreprise = entreprise;
    }

    public EntreprisePlanDTO getEntreprisePlan() {
        return entreprisePlan;
    }

    public void setEntreprisePlan(EntreprisePlanDTO entreprisePlan) {
        this.entreprisePlan = entreprisePlan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlanSaleDTO)) {
            return false;
        }

        EntreprisePlanSaleDTO entreprisePlanSaleDTO = (EntreprisePlanSaleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entreprisePlanSaleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlanSaleDTO{" +
            "id=" + getId() +
            ", token='" + getToken() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", expirateDate='" + getExpirateDate() + "'" +
            ", statut='" + getStatut() + "'" +
            ", entreprise=" + getEntreprise() +
            ", entreprisePlan=" + getEntreprisePlan() +
            "}";
    }
}
