package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.DayTirage;
import com.seventh.lotoapp.domain.State;
import com.seventh.lotoapp.service.dto.DayTirageDTO;
import com.seventh.lotoapp.service.dto.StateDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayTirage} and its DTO {@link DayTirageDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayTirageMapper extends EntityMapper<DayTirageDTO, DayTirage> {
    @Mapping(target = "state", source = "state", qualifiedByName = "stateId")
    DayTirageDTO toDto(DayTirage s);

    @Named("stateId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StateDTO toDtoStateId(State state);
}
