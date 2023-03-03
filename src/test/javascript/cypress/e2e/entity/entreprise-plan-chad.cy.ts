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

describe('EntreprisePlan e2e test', () => {
  const entreprisePlanPageUrl = '/entreprise-plan-chad';
  const entreprisePlanPageUrlPattern = new RegExp('/entreprise-plan-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const entreprisePlanSample = { prix: 18232, name: 'Intranet', type: 'Mensuel' };

  let entreprisePlan;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/entreprise-plans+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/entreprise-plans').as('postEntityRequest');
    cy.intercept('DELETE', '/api/entreprise-plans/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (entreprisePlan) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/entreprise-plans/${entreprisePlan.id}`,
      }).then(() => {
        entreprisePlan = undefined;
      });
    }
  });

  it('EntreprisePlans menu should load EntreprisePlans page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('entreprise-plan-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('EntreprisePlan').should('exist');
    cy.url().should('match', entreprisePlanPageUrlPattern);
  });

  describe('EntreprisePlan page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(entreprisePlanPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create EntreprisePlan page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/entreprise-plan-chad/new$'));
        cy.getEntityCreateUpdateHeading('EntreprisePlan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/entreprise-plans',
          body: entreprisePlanSample,
        }).then(({ body }) => {
          entreprisePlan = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/entreprise-plans+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/entreprise-plans?page=0&size=20>; rel="last",<http://localhost/api/entreprise-plans?page=0&size=20>; rel="first"',
              },
              body: [entreprisePlan],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(entreprisePlanPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details EntreprisePlan page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('entreprisePlan');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlan page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlan page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlan');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPageUrlPattern);
      });

      it('last delete button click should delete instance of EntreprisePlan', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('entreprisePlan').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPageUrlPattern);

        entreprisePlan = undefined;
      });
    });
  });

  describe('new EntreprisePlan page', () => {
    beforeEach(() => {
      cy.visit(`${entreprisePlanPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('EntreprisePlan');
    });

    it('should create an instance of EntreprisePlan', () => {
      cy.get(`[data-cy="prix"]`).type('26468').should('have.value', '26468');

      cy.get(`[data-cy="name"]`).type('Optimization').should('have.value', 'Optimization');

      cy.get(`[data-cy="type"]`).select('Annuel');

      cy.get(`[data-cy="avantage"]`).type('parse Decentralized Generic').should('have.value', 'parse Decentralized Generic');

      cy.get(`[data-cy="requestPerDay"]`).type('78507').should('have.value', '78507');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        entreprisePlan = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', entreprisePlanPageUrlPattern);
    });
  });
});
