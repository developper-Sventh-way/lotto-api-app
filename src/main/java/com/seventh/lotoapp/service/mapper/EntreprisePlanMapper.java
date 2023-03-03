package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.EntreprisePlan;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EntreprisePlan} and its DTO {@link EntreprisePlanDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntreprisePlanMapper extends EntityMapper<EntreprisePlanDTO, EntreprisePlan> {}
