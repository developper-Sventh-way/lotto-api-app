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

describe('StateConfiguration e2e test', () => {
  const stateConfigurationPageUrl = '/state-configuration-chad';
  const stateConfigurationPageUrlPattern = new RegExp('/state-configuration-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const stateConfigurationSample = { startHour: 'full-range cross-platform enterprise', endHour: 'virtual Granite Cove' };

  let stateConfiguration;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/state-configurations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/state-configurations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/state-configurations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (stateConfiguration) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/state-configurations/${stateConfiguration.id}`,
      }).then(() => {
        stateConfiguration = undefined;
      });
    }
  });

  it('StateConfigurations menu should load StateConfigurations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('state-configuration-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('StateConfiguration').should('exist');
    cy.url().should('match', stateConfigurationPageUrlPattern);
  });

  describe('StateConfiguration page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(stateConfigurationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create StateConfiguration page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/state-configuration-chad/new$'));
        cy.getEntityCreateUpdateHeading('StateConfiguration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stateConfigurationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/state-configurations',
          body: stateConfigurationSample,
        }).then(({ body }) => {
          stateConfiguration = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/state-configurations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/state-configurations?page=0&size=20>; rel="last",<http://localhost/api/state-configurations?page=0&size=20>; rel="first"',
              },
              body: [stateConfiguration],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(stateConfigurationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details StateConfiguration page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('stateConfiguration');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stateConfigurationPageUrlPattern);
      });

      it('edit button click should load edit StateConfiguration page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StateConfiguration');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stateConfigurationPageUrlPattern);
      });

      it('edit button click should load edit StateConfiguration page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StateConfiguration');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stateConfigurationPageUrlPattern);
      });

      it('last delete button click should delete instance of StateConfiguration', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('stateConfiguration').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', stateConfigurationPageUrlPattern);

        stateConfiguration = undefined;
      });
    });
  });

  describe('new StateConfiguration page', () => {
    beforeEach(() => {
      cy.visit(`${stateConfigurationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('StateConfiguration');
    });

    it('should create an instance of StateConfiguration', () => {
      cy.get(`[data-cy="startHour"]`).type('Island extensible').should('have.value', 'Island extensible');

      cy.get(`[data-cy="endHour"]`).type('Florida').should('have.value', 'Florida');

      cy.get(`[data-cy="statut"]`).select('CLOSED');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        stateConfiguration = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', stateConfigurationPageUrlPattern);
    });
  });
});
