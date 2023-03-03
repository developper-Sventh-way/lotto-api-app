package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "representant", nullable = false)
    private String representant;

    @Column(name = "cin")
    private String cin;

    @Column(name = "nif")
    private String nif;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "requestTransactions", "entreprise", "entreprisePlan" }, allowSetters = true)
    private Set<EntreprisePlanSale> entreprisePlanSales = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entreprisePlanSale", "entreprise" }, allowSetters = true)
    private Set<RequestTransaction> requestTransactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Entreprise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Entreprise name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRepresentant() {
        return this.representant;
    }

    public Entreprise representant(String representant) {
        this.setRepresentant(representant);
        return this;
    }

    public void setRepresentant(String representant) {
        this.representant = representant;
    }

    public String getCin() {
        return this.cin;
    }

    public Entreprise cin(String cin) {
        this.setCin(cin);
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNif() {
        return this.nif;
    }

    public Entreprise nif(String nif) {
        this.setNif(nif);
        return this;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public Set<EntreprisePlanSale> getEntreprisePlanSales() {
        return this.entreprisePlanSales;
    }

    public void setEntreprisePlanSales(Set<EntreprisePlanSale> entreprisePlanSales) {
        if (this.entreprisePlanSales != null) {
            this.entreprisePlanSales.forEach(i -> i.setEntreprise(null));
        }
        if (entreprisePlanSales != null) {
            entreprisePlanSales.forEach(i -> i.setEntreprise(this));
        }
        this.entreprisePlanSales = entreprisePlanSales;
    }

    public Entreprise entreprisePlanSales(Set<EntreprisePlanSale> entreprisePlanSales) {
        this.setEntreprisePlanSales(entreprisePlanSales);
        return this;
    }

    public Entreprise addEntreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.entreprisePlanSales.add(entreprisePlanSale);
        entreprisePlanSale.setEntreprise(this);
        return this;
    }

    public Entreprise removeEntreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.entreprisePlanSales.remove(entreprisePlanSale);
        entreprisePlanSale.setEntreprise(null);
        return this;
    }

    public Set<RequestTransaction> getRequestTransactions() {
        return this.requestTransactions;
    }

    public void setRequestTransactions(Set<RequestTransaction> requestTransactions) {
        if (this.requestTransactions != null) {
            this.requestTransactions.forEach(i -> i.setEntreprise(null));
        }
        if (requestTransactions != null) {
            requestTransactions.forEach(i -> i.setEntreprise(this));
        }
        this.requestTransactions = requestTransactions;
    }

    public Entreprise requestTransactions(Set<RequestTransaction> requestTransactions) {
        this.setRequestTransactions(requestTransactions);
        return this;
    }

    public Entreprise addRequestTransaction(RequestTransaction requestTransaction) {
        this.requestTransactions.add(requestTransaction);
        requestTransaction.setEntreprise(this);
        return this;
    }

    public Entreprise removeRequestTransaction(RequestTransaction requestTransaction) {
        this.requestTransactions.remove(requestTransaction);
        requestTransaction.setEntreprise(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entreprise)) {
            return false;
        }
        return id != null && id.equals(((Entreprise) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", representant='" + getRepresentant() + "'" +
            ", cin='" + getCin() + "'" +
            ", nif='" + getNif() + "'" +
            "}";
    }
}
