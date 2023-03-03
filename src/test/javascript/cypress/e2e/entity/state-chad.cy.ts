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

describe('State e2e test', () => {
  const statePageUrl = '/state-chad';
  const statePageUrlPattern = new RegExp('/state-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const stateSample = { name: 'overriding deposit Manager' };

  let state;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/states+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/states').as('postEntityRequest');
    cy.intercept('DELETE', '/api/states/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (state) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/states/${state.id}`,
      }).then(() => {
        state = undefined;
      });
    }
  });

  it('States menu should load States page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('state-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('State').should('exist');
    cy.url().should('match', statePageUrlPattern);
  });

  describe('State page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(statePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create State page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/state-chad/new$'));
        cy.getEntityCreateUpdateHeading('State');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', statePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/states',
          body: stateSample,
        }).then(({ body }) => {
          state = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/states+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/states?page=0&size=20>; rel="last",<http://localhost/api/states?page=0&size=20>; rel="first"',
              },
              body: [state],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(statePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details State page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('state');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', statePageUrlPattern);
      });

      it('edit button click should load edit State page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('State');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', statePageUrlPattern);
      });

      it('edit button click should load edit State page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('State');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', statePageUrlPattern);
      });

      it('last delete button click should delete instance of State', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('state').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', statePageUrlPattern);

        state = undefined;
      });
    });
  });

  describe('new State page', () => {
    beforeEach(() => {
      cy.visit(`${statePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('State');
    });

    it('should create an instance of State', () => {
      cy.get(`[data-cy="name"]`).type('SAS Strategist reintermediate').should('have.value', 'SAS Strategist reintermediate');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        state = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', statePageUrlPattern);
    });
  });
});
