package com.seventh.lotoapp.service.mapper;

import com.seventh.lotoapp.domain.Entreprise;
import com.seventh.lotoapp.domain.EntreprisePlanSale;
import com.seventh.lotoapp.domain.RequestTransaction;
import com.seventh.lotoapp.service.dto.EntrepriseDTO;
import com.seventh.lotoapp.service.dto.EntreprisePlanSaleDTO;
import com.seventh.lotoapp.service.dto.RequestTransactionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RequestTransaction} and its DTO {@link RequestTransactionDTO}.
 */
@Mapper(componentModel = "spring")
public interface RequestTransactionMapper extends EntityMapper<RequestTransactionDTO, RequestTransaction> {
    @Mapping(target = "entreprisePlanSale", source = "entreprisePlanSale", qualifiedByName = "entreprisePlanSaleId")
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    RequestTransactionDTO toDto(RequestTransaction s);

    @Named("entreprisePlanSaleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntreprisePlanSaleDTO toDtoEntreprisePlanSaleId(EntreprisePlanSale entreprisePlanSale);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
