package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RequestTransaction.
 */
@Entity
@Table(name = "request_transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RequestTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date_transaction")
    private Instant dateTransaction;

    @ManyToOne
    @JsonIgnoreProperties(value = { "requestTransactions", "entreprise", "entreprisePlan" }, allowSetters = true)
    private EntreprisePlanSale entreprisePlanSale;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanSales", "requestTransactions" }, allowSetters = true)
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RequestTransaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public RequestTransaction description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDateTransaction() {
        return this.dateTransaction;
    }

    public RequestTransaction dateTransaction(Instant dateTransaction) {
        this.setDateTransaction(dateTransaction);
        return this;
    }

    public void setDateTransaction(Instant dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public EntreprisePlanSale getEntreprisePlanSale() {
        return this.entreprisePlanSale;
    }

    public void setEntreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.entreprisePlanSale = entreprisePlanSale;
    }

    public RequestTransaction entreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.setEntreprisePlanSale(entreprisePlanSale);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public RequestTransaction entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestTransaction)) {
            return false;
        }
        return id != null && id.equals(((RequestTransaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RequestTransaction{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", dateTransaction='" + getDateTransaction() + "'" +
            "}";
    }
}
