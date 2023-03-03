package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.seventh.lotoapp.domain.enumeration.ConfigStatut;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StateConfiguration.
 */
@Entity
@Table(name = "state_configuration")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StateConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "start_hour", nullable = false)
    private String startHour;

    @NotNull
    @Column(name = "end_hour", nullable = false)
    private String endHour;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private ConfigStatut statut;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanPermissions", "stateConfigurations", "dayTirages" }, allowSetters = true)
    private State state;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StateConfiguration id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartHour() {
        return this.startHour;
    }

    public StateConfiguration startHour(String startHour) {
        this.setStartHour(startHour);
        return this;
    }

    public void setStartHour(String startHour) {
        this.startHour = startHour;
    }

    public String getEndHour() {
        return this.endHour;
    }

    public StateConfiguration endHour(String endHour) {
        this.setEndHour(endHour);
        return this;
    }

    public void setEndHour(String endHour) {
        this.endHour = endHour;
    }

    public ConfigStatut getStatut() {
        return this.statut;
    }

    public StateConfiguration statut(ConfigStatut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(ConfigStatut statut) {
        this.statut = statut;
    }

    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public StateConfiguration state(State state) {
        this.setState(state);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StateConfiguration)) {
            return false;
        }
        return id != null && id.equals(((StateConfiguration) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StateConfiguration{" +
            "id=" + getId() +
            ", startHour='" + getStartHour() + "'" +
            ", endHour='" + getEndHour() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
