package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.EntreprisePlan;
import com.seventh.lotoapp.domain.EntreprisePlanPermission;
import com.seventh.lotoapp.domain.State;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import com.seventh.lotoapp.service.dto.EntreprisePlanPermissionDTO;
import com.seventh.lotoapp.service.dto.StateDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EntreprisePlanPermission} and its DTO {@link EntreprisePlanPermissionDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntreprisePlanPermissionMapper extends EntityMapper<EntreprisePlanPermissionDTO, EntreprisePlanPermission> {
    @Mapping(target = "entreprisePlan", source = "entreprisePlan", qualifiedByName = "entreprisePlanId")
    @Mapping(target = "state", source = "state", qualifiedByName = "stateId")
    EntreprisePlanPermissionDTO toDto(EntreprisePlanPermission s);

    @Named("entreprisePlanId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntreprisePlanDTO toDtoEntreprisePlanId(EntreprisePlan entreprisePlan);

    @Named("stateId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StateDTO toDtoStateId(State state);
}
