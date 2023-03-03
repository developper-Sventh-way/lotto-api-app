package com.seventh.lotoapp.service.dto;

import com.seventh.lotoapp.domain.enumeration.ConfigStatut;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.StateConfiguration} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StateConfigurationDTO implements Serializable {

    private Long id;

    @NotNull
    private String startHour;

    @NotNull
    private String endHour;

    private ConfigStatut statut;

    private StateDTO state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartHour() {
        return startHour;
    }

    public void setStartHour(String startHour) {
        this.startHour = startHour;
    }

    public String getEndHour() {
        return endHour;
    }

    public void setEndHour(String endHour) {
        this.endHour = endHour;
    }

    public ConfigStatut getStatut() {
        return statut;
    }

    public void setStatut(ConfigStatut statut) {
        this.statut = statut;
    }

    public StateDTO getState() {
        return state;
    }

    public void setState(StateDTO state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StateConfigurationDTO)) {
            return false;
        }

        StateConfigurationDTO stateConfigurationDTO = (StateConfigurationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, stateConfigurationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StateConfigurationDTO{" +
            "id=" + getId() +
            ", startHour='" + getStartHour() + "'" +
            ", endHour='" + getEndHour() + "'" +
            ", statut='" + getStatut() + "'" +
            ", state=" + getState() +
            "}";
    }
}
