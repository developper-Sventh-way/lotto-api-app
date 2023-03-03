package com.seventh.lotoapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.seventh.lotoapp.domain.enumeration.TirageType;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DayTirage.
 */
@Entity
@Table(name = "day_tirage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayTirage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tirage_type", nullable = false)
    private TirageType tirageType;

    @Column(name = "date_in_string")
    private String dateInString;

    @Column(name = "premier_lot")
    private String premierLot;

    @Column(name = "deuxieme_lot")
    private String deuxiemeLot;

    @Column(name = "troisieme_lot")
    private String troisiemeLot;

    @Column(name = "pic_3")
    private String pic3;

    @Column(name = "win_4")
    private String win4;

    @Column(name = "date_transaction")
    private Instant dateTransaction;

    @ManyToOne
    @JsonIgnoreProperties(value = { "entreprisePlanPermissions", "stateConfigurations", "dayTirages" }, allowSetters = true)
    private State state;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DayTirage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TirageType getTirageType() {
        return this.tirageType;
    }

    public DayTirage tirageType(TirageType tirageType) {
        this.setTirageType(tirageType);
        return this;
    }

    public void setTirageType(TirageType tirageType) {
        this.tirageType = tirageType;
    }

    public String getDateInString() {
        return this.dateInString;
    }

    public DayTirage dateInString(String dateInString) {
        this.setDateInString(dateInString);
        return this;
    }

    public void setDateInString(String dateInString) {
        this.dateInString = dateInString;
    }

    public String getPremierLot() {
        return this.premierLot;
    }

    public DayTirage premierLot(String premierLot) {
        this.setPremierLot(premierLot);
        return this;
    }

    public void setPremierLot(String premierLot) {
        this.premierLot = premierLot;
    }

    public String getDeuxiemeLot() {
        return this.deuxiemeLot;
    }

    public DayTirage deuxiemeLot(String deuxiemeLot) {
        this.setDeuxiemeLot(deuxiemeLot);
        return this;
    }

    public void setDeuxiemeLot(String deuxiemeLot) {
        this.deuxiemeLot = deuxiemeLot;
    }

    public String getTroisiemeLot() {
        return this.troisiemeLot;
    }

    public DayTirage troisiemeLot(String troisiemeLot) {
        this.setTroisiemeLot(troisiemeLot);
        return this;
    }

    public void setTroisiemeLot(String troisiemeLot) {
        this.troisiemeLot = troisiemeLot;
    }

    public String getPic3() {
        return this.pic3;
    }

    public DayTirage pic3(String pic3) {
        this.setPic3(pic3);
        return this;
    }

    public void setPic3(String pic3) {
        this.pic3 = pic3;
    }

    public String getWin4() {
        return this.win4;
    }

    public DayTirage win4(String win4) {
        this.setWin4(win4);
        return this;
    }

    public void setWin4(String win4) {
        this.win4 = win4;
    }

    public Instant getDateTransaction() {
        return this.dateTransaction;
    }

    public DayTirage dateTransaction(Instant dateTransaction) {
        this.setDateTransaction(dateTransaction);
        return this;
    }

    public void setDateTransaction(Instant dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public DayTirage state(State state) {
        this.setState(state);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayTirage)) {
            return false;
        }
        return id != null && id.equals(((DayTirage) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayTirage{" +
            "id=" + getId() +
            ", tirageType='" + getTirageType() + "'" +
            ", dateInString='" + getDateInString() + "'" +
            ", premierLot='" + getPremierLot() + "'" +
            ", deuxiemeLot='" + getDeuxiemeLot() + "'" +
            ", troisiemeLot='" + getTroisiemeLot() + "'" +
            ", pic3='" + getPic3() + "'" +
            ", win4='" + getWin4() + "'" +
            ", dateTransaction='" + getDateTransaction() + "'" +
            "}";
    }
}
