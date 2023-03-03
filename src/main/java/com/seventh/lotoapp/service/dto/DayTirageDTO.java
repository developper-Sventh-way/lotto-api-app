package com.seventh.lotoapp.service.dto;

import com.seventh.lotoapp.domain.enumeration.TirageType;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.seventh.lotoapp.domain.DayTirage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayTirageDTO implements Serializable {

    private Long id;

    @NotNull
    private TirageType tirageType;

    private String dateInString;

    private String premierLot;

    private String deuxiemeLot;

    private String troisiemeLot;

    private String pic3;

    private String win4;

    private Instant dateTransaction;

    private StateDTO state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TirageType getTirageType() {
        return tirageType;
    }

    public void setTirageType(TirageType tirageType) {
        this.tirageType = tirageType;
    }

    public String getDateInString() {
        return dateInString;
    }

    public void setDateInString(String dateInString) {
        this.dateInString = dateInString;
    }

    public String getPremierLot() {
        return premierLot;
    }

    public void setPremierLot(String premierLot) {
        this.premierLot = premierLot;
    }

    public String getDeuxiemeLot() {
        return deuxiemeLot;
    }

    public void setDeuxiemeLot(String deuxiemeLot) {
        this.deuxiemeLot = deuxiemeLot;
    }

    public String getTroisiemeLot() {
        return troisiemeLot;
    }

    public void setTroisiemeLot(String troisiemeLot) {
        this.troisiemeLot = troisiemeLot;
    }

    public String getPic3() {
        return pic3;
    }

    public void setPic3(String pic3) {
        this.pic3 = pic3;
    }

    public String getWin4() {
        return win4;
    }

    public void setWin4(String win4) {
        this.win4 = win4;
    }

    public Instant getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(Instant dateTransaction) {
        this.dateTransaction = dateTransaction;
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
        if (!(o instanceof DayTirageDTO)) {
            return false;
        }

        DayTirageDTO dayTirageDTO = (DayTirageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayTirageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayTirageDTO{" +
            "id=" + getId() +
            ", tirageType='" + getTirageType() + "'" +
            ", dateInString='" + getDateInString() + "'" +
            ", premierLot='" + getPremierLot() + "'" +
            ", deuxiemeLot='" + getDeuxiemeLot() + "'" +
            ", troisiemeLot='" + getTroisiemeLot() + "'" +
            ", pic3='" + getPic3() + "'" +
            ", win4='" + getWin4() + "'" +
            ", dateTransaction='" + getDateTransaction() + "'" +
            ", state=" + getState() +
            "}";
    }
}
