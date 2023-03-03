package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EntreprisePlanPermission.
 */
@Entity
@Table(name = "entreprise_plan_permission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntreprisePlanPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanSales", "entreprisePlanPermissions" }, allowSetters = true)
    private EntreprisePlan entreprisePlan;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanPermissions", "stateConfigurations", "dayTirages" }, allowSetters = true)
    private State state;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EntreprisePlanPermission id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public EntreprisePlanPermission description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EntreprisePlan getEntreprisePlan() {
        return this.entreprisePlan;
    }

    public void setEntreprisePlan(EntreprisePlan entreprisePlan) {
        this.entreprisePlan = entreprisePlan;
    }

    public EntreprisePlanPermission entreprisePlan(EntreprisePlan entreprisePlan) {
        this.setEntreprisePlan(entreprisePlan);
        return this;
    }

    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public EntreprisePlanPermission state(State state) {
        this.setState(state);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntreprisePlanPermission)) {
            return false;
        }
        return id != null && id.equals(((EntreprisePlanPermission) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntreprisePlanPermission{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
