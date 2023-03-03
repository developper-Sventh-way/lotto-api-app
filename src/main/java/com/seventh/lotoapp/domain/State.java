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
 * A State.
 */
@Entity
@Table(name = "state")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class State implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "state")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entreprisePlan", "state" }, allowSetters = true)
    private Set<EntreprisePlanPermission> entreprisePlanPermissions = new HashSet<>();

    @OneToMany(mappedBy = "state")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "state" }, allowSetters = true)
    private Set<StateConfiguration> stateConfigurations = new HashSet<>();

    @OneToMany(mappedBy = "state")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "state" }, allowSetters = true)
    private Set<DayTirage> dayTirages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public State id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public State name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<EntreprisePlanPermission> getEntreprisePlanPermissions() {
        return this.entreprisePlanPermissions;
    }

    public void setEntreprisePlanPermissions(Set<EntreprisePlanPermission> entreprisePlanPermissions) {
        if (this.entreprisePlanPermissions != null) {
            this.entreprisePlanPermissions.forEach(i -> i.setState(null));
        }
        if (entreprisePlanPermissions != null) {
            entreprisePlanPermissions.forEach(i -> i.setState(this));
        }
        this.entreprisePlanPermissions = entreprisePlanPermissions;
    }

    public State entreprisePlanPermissions(Set<EntreprisePlanPermission> entreprisePlanPermissions) {
        this.setEntreprisePlanPermissions(entreprisePlanPermissions);
        return this;
    }

    public State addEntreprisePlanPermission(EntreprisePlanPermission entreprisePlanPermission) {
        this.entreprisePlanPermissions.add(entreprisePlanPermission);
        entreprisePlanPermission.setState(this);
        return this;
    }

    public State removeEntreprisePlanPermission(EntreprisePlanPermission entreprisePlanPermission) {
        this.entreprisePlanPermissions.remove(entreprisePlanPermission);
        entreprisePlanPermission.setState(null);
        return this;
    }

    public Set<StateConfiguration> getStateConfigurations() {
        return this.stateConfigurations;
    }

    public void setStateConfigurations(Set<StateConfiguration> stateConfigurations) {
        if (this.stateConfigurations != null) {
            this.stateConfigurations.forEach(i -> i.setState(null));
        }
        if (stateConfigurations != null) {
            stateConfigurations.forEach(i -> i.setState(this));
        }
        this.stateConfigurations = stateConfigurations;
    }

    public State stateConfigurations(Set<StateConfiguration> stateConfigurations) {
        this.setStateConfigurations(stateConfigurations);
        return this;
    }

    public State addStateConfiguration(StateConfiguration stateConfiguration) {
        this.stateConfigurations.add(stateConfiguration);
        stateConfiguration.setState(this);
        return this;
    }

    public State removeStateConfiguration(StateConfiguration stateConfiguration) {
        this.stateConfigurations.remove(stateConfiguration);
        stateConfiguration.setState(null);
        return this;
    }

    public Set<DayTirage> getDayTirages() {
        return this.dayTirages;
    }

    public void setDayTirages(Set<DayTirage> dayTirages) {
        if (this.dayTirages != null) {
            this.dayTirages.forEach(i -> i.setState(null));
        }
        if (dayTirages != null) {
            dayTirages.forEach(i -> i.setState(this));
        }
        this.dayTirages = dayTirages;
    }

    public State dayTirages(Set<DayTirage> dayTirages) {
        this.setDayTirages(dayTirages);
        return this;
    }

    public State addDayTirage(DayTirage dayTirage) {
        this.dayTirages.add(dayTirage);
        dayTirage.setState(this);
        return this;
    }

    public State removeDayTirage(DayTirage dayTirage) {
        this.dayTirages.remove(dayTirage);
        dayTirage.setState(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof State)) {
            return false;
        }
        return id != null && id.equals(((State) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "State{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
