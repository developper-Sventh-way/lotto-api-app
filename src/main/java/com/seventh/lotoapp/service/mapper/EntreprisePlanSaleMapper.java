package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.Entreprise;
import com.seventh.lotoapp.domain.EntreprisePlan;
import com.seventh.lotoapp.domain.EntreprisePlanSale;
import com.seventh.lotoapp.service.dto.EntrepriseDTO;
import com.seventh.lotoapp.service.dto.EntreprisePlanDTO;
import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EntreprisePlanSale} and its DTO {@link EntreprisePlanSaleDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntreprisePlanSaleMapper extends EntityMapper<EntreprisePlanSaleDTO, EntreprisePlanSale> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    @Mapping(target = "entreprisePlan", source = "entreprisePlan", qualifiedByName = "entreprisePlanId")
    EntreprisePlanSaleDTO toDto(EntreprisePlanSale s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);

    @Named("entreprisePlanId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntreprisePlanDTO toDtoEntreprisePlanId(EntreprisePlan entreprisePlan);
}
