import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('EntreprisePlanSale e2e test', () => {
  const entreprisePlanSalePageUrl = '/entreprise-plan-sale-chad';
  const entreprisePlanSalePageUrlPattern = new RegExp('/entreprise-plan-sale-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const entreprisePlanSaleSample = { token: 'Bedfordshire', statut: 'Active' };

  let entreprisePlanSale;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/entreprise-plan-sales+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/entreprise-plan-sales').as('postEntityRequest');
    cy.intercept('DELETE', '/api/entreprise-plan-sales/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (entreprisePlanSale) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/entreprise-plan-sales/${entreprisePlanSale.id}`,
      }).then(() => {
        entreprisePlanSale = undefined;
      });
    }
  });

  it('EntreprisePlanSales menu should load EntreprisePlanSales page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('entreprise-plan-sale-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('EntreprisePlanSale').should('exist');
    cy.url().should('match', entreprisePlanSalePageUrlPattern);
  });

  describe('EntreprisePlanSale page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(entreprisePlanSalePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create EntreprisePlanSale page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/entreprise-plan-sale-chad/new$'));
        cy.getEntityCreateUpdateHeading('EntreprisePlanSale');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanSalePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/entreprise-plan-sales',
          body: entreprisePlanSaleSample,
        }).then(({ body }) => {
          entreprisePlanSale = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/entreprise-plan-sales+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/entreprise-plan-sales?page=0&size=20>; rel="last",<http://localhost/api/entreprise-plan-sales?page=0&size=20>; rel="first"',
              },
              body: [entreprisePlanSale],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(entreprisePlanSalePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details EntreprisePlanSale page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('entreprisePlanSale');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanSalePageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlanSale page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlanSale');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanSalePageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlanSale page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlanSale');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanSalePageUrlPattern);
      });

      it('last delete button click should delete instance of EntreprisePlanSale', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('entreprisePlanSale').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanSalePageUrlPattern);

        entreprisePlanSale = undefined;
      });
    });
  });

  describe('new EntreprisePlanSale page', () => {
    beforeEach(() => {
      cy.visit(`${entreprisePlanSalePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('EntreprisePlanSale');
    });

    it('should create an instance of EntreprisePlanSale', () => {
      cy.get(`[data-cy="token"]`).type('mindshare').should('have.value', 'mindshare');

      cy.get(`[data-cy="startDate"]`).type('2023-03-03T04:31').blur().should('have.value', '2023-03-03T04:31');

      cy.get(`[data-cy="expirateDate"]`).type('2023-03-03T03:47').blur().should('have.value', '2023-03-03T03:47');

      cy.get(`[data-cy="statut"]`).select('Expired');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        entreprisePlanSale = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', entreprisePlanSalePageUrlPattern);
    });
  });
});
