package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.Entreprise;
import com.seventh.lotoapp.service.dto.EntrepriseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Entreprise} and its DTO {@link EntrepriseDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntrepriseMapper extends EntityMapper<EntrepriseDTO, Entreprise> {}
