package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.seventh.lotoapp.domain.enumeration.PlanStatut;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EntreprisePlanSale.
 */
@Entity
@Table(name = "entreprise_plan_sale")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlanSale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "expirate_date")
    private Instant expirateDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private PlanStatut statut;

    @OneToMany(mappedBy = "entreprisePlanSale")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entreprisePlanSale", "entreprise" }, allowSetters = true)
    private Set<RequestTransaction> requestTransactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanSales", "requestTransactions" }, allowSetters = true)
    private Entreprise entreprise;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanSales", "entreprisePlanPermissions" }, allowSetters = true)
    private EntreprisePlan entreprisePlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EntreprisePlanSale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return this.token;
    }

    public EntreprisePlanSale token(String token) {
        this.setToken(token);
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public EntreprisePlanSale startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getExpirateDate() {
        return this.expirateDate;
    }

    public EntreprisePlanSale expirateDate(Instant expirateDate) {
        this.setExpirateDate(expirateDate);
        return this;
    }

    public void setExpirateDate(Instant expirateDate) {
        this.expirateDate = expirateDate;
    }

    public PlanStatut getStatut() {
        return this.statut;
    }

    public EntreprisePlanSale statut(PlanStatut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(PlanStatut statut) {
        this.statut = statut;
    }

    public Set<RequestTransaction> getRequestTransactions() {
        return this.requestTransactions;
    }

    public void setRequestTransactions(Set<RequestTransaction> requestTransactions) {
        if (this.requestTransactions != null) {
            this.requestTransactions.forEach(i -> i.setEntreprisePlanSale(null));
        }
        if (requestTransactions != null) {
            requestTransactions.forEach(i -> i.setEntreprisePlanSale(this));
        }
        this.requestTransactions = requestTransactions;
    }

    public EntreprisePlanSale requestTransactions(Set<RequestTransaction> requestTransactions) {
        this.setRequestTransactions(requestTransactions);
        return this;
    }

    public EntreprisePlanSale addRequestTransaction(RequestTransaction requestTransaction) {
        this.requestTransactions.add(requestTransaction);
        requestTransaction.setEntreprisePlanSale(this);
        return this;
    }

    public EntreprisePlanSale removeRequestTransaction(RequestTransaction requestTransaction) {
        this.requestTransactions.remove(requestTransaction);
        requestTransaction.setEntreprisePlanSale(null);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public EntreprisePlanSale entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    public EntreprisePlan getEntreprisePlan() {
        return this.entreprisePlan;
    }

    public void setEntreprisePlan(EntreprisePlan entreprisePlan) {
        this.entreprisePlan = entreprisePlan;
    }

    public EntreprisePlanSale entreprisePlan(EntreprisePlan entreprisePlan) {
        this.setEntreprisePlan(entreprisePlan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlanSale)) {
            return false;
        }
        return id != null && id.equals(((EntreprisePlanSale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlanSale{" +
            "id=" + getId() +
            ", token='" + getToken() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", expirateDate='" + getExpirateDate() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
