package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.seventh.lotoapp.domain.enumeration.TypePlan;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EntreprisePlan.
 */
@Entity
@Table(name = "entreprise_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "prix", precision = 21, scale = 2, nullable = false)
    private BigDecimal prix;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypePlan type;

    @Column(name = "avantage")
    private String avantage;

    @Column(name = "request_per_day")
    private Long requestPerDay;

    @OneToMany(mappedBy = "entreprisePlan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "requestTransactions", "entreprise", "entreprisePlan" }, allowSetters = true)
    private Set<EntreprisePlanSale> entreprisePlanSales = new HashSet<>();

    @OneToMany(mappedBy = "entreprisePlan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entreprisePlan", "state" }, allowSetters = true)
    private Set<EntreprisePlanPermission> entreprisePlanPermissions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EntreprisePlan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPrix() {
        return this.prix;
    }

    public EntreprisePlan prix(BigDecimal prix) {
        this.setPrix(prix);
        return this;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public String getName() {
        return this.name;
    }

    public EntreprisePlan name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypePlan getType() {
        return this.type;
    }

    public EntreprisePlan type(TypePlan type) {
        this.setType(type);
        return this;
    }

    public void setType(TypePlan type) {
        this.type = type;
    }

    public String getAvantage() {
        return this.avantage;
    }

    public EntreprisePlan avantage(String avantage) {
        this.setAvantage(avantage);
        return this;
    }

    public void setAvantage(String avantage) {
        this.avantage = avantage;
    }

    public Long getRequestPerDay() {
        return this.requestPerDay;
    }

    public EntreprisePlan requestPerDay(Long requestPerDay) {
        this.setRequestPerDay(requestPerDay);
        return this;
    }

    public void setRequestPerDay(Long requestPerDay) {
        this.requestPerDay = requestPerDay;
    }

    public Set<EntreprisePlanSale> getEntreprisePlanSales() {
        return this.entreprisePlanSales;
    }

    public void setEntreprisePlanSales(Set<EntreprisePlanSale> entreprisePlanSales) {
        if (this.entreprisePlanSales != null) {
            this.entreprisePlanSales.forEach(i -> i.setEntreprisePlan(null));
        }
        if (entreprisePlanSales != null) {
            entreprisePlanSales.forEach(i -> i.setEntreprisePlan(this));
        }
        this.entreprisePlanSales = entreprisePlanSales;
    }

    public EntreprisePlan entreprisePlanSales(Set<EntreprisePlanSale> entreprisePlanSales) {
        this.setEntreprisePlanSales(entreprisePlanSales);
        return this;
    }

    public EntreprisePlan addEntreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.entreprisePlanSales.add(entreprisePlanSale);
        entreprisePlanSale.setEntreprisePlan(this);
        return this;
    }

    public EntreprisePlan removeEntreprisePlanSale(EntreprisePlanSale entreprisePlanSale) {
        this.entreprisePlanSales.remove(entreprisePlanSale);
        entreprisePlanSale.setEntreprisePlan(null);
        return this;
    }

    public Set<EntreprisePlanPermission> getEntreprisePlanPermissions() {
        return this.entreprisePlanPermissions;
    }

    public void setEntreprisePlanPermissions(Set<EntreprisePlanPermission> entreprisePlanPermissions) {
        if (this.entreprisePlanPermissions != null) {
            this.entreprisePlanPermissions.forEach(i -> i.setEntreprisePlan(null));
        }
        if (entreprisePlanPermissions != null) {
            entreprisePlanPermissions.forEach(i -> i.setEntreprisePlan(this));
        }
        this.entreprisePlanPermissions = entreprisePlanPermissions;
    }

    public EntreprisePlan entreprisePlanPermissions(Set<EntreprisePlanPermission> entreprisePlanPermissions) {
        this.setEntreprisePlanPermissions(entreprisePlanPermissions);
        return this;
    }

    public EntreprisePlan addEntreprisePlanPermission(EntreprisePlanPermission entreprisePlanPermission) {
        this.entreprisePlanPermissions.add(entreprisePlanPermission);
        entreprisePlanPermission.setEntreprisePlan(this);
        return this;
    }

    public EntreprisePlan removeEntreprisePlanPermission(EntreprisePlanPermission entreprisePlanPermission) {
        this.entreprisePlanPermissions.remove(entreprisePlanPermission);
        entreprisePlanPermission.setEntreprisePlan(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlan)) {
            return false;
        }
        return id != null && id.equals(((EntreprisePlan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlan{" +
            "id=" + getId() +
            ", prix=" + getPrix() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", avantage='" + getAvantage() + "'" +
            ", requestPerDay=" + getRequestPerDay() +
            "}";
    }
}
