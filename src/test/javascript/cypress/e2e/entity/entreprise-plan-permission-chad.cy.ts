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

describe('EntreprisePlanPermission e2e test', () => {
  const entreprisePlanPermissionPageUrl = '/entreprise-plan-permission-chad';
  const entreprisePlanPermissionPageUrlPattern = new RegExp('/entreprise-plan-permission-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const entreprisePlanPermissionSample = {};

  let entreprisePlanPermission;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/entreprise-plan-permissions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/entreprise-plan-permissions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/entreprise-plan-permissions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (entreprisePlanPermission) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/entreprise-plan-permissions/${entreprisePlanPermission.id}`,
      }).then(() => {
        entreprisePlanPermission = undefined;
      });
    }
  });

  it('EntreprisePlanPermissions menu should load EntreprisePlanPermissions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('entreprise-plan-permission-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('EntreprisePlanPermission').should('exist');
    cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
  });

  describe('EntreprisePlanPermission page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(entreprisePlanPermissionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create EntreprisePlanPermission page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/entreprise-plan-permission-chad/new$'));
        cy.getEntityCreateUpdateHeading('EntreprisePlanPermission');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/entreprise-plan-permissions',
          body: entreprisePlanPermissionSample,
        }).then(({ body }) => {
          entreprisePlanPermission = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/entreprise-plan-permissions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/entreprise-plan-permissions?page=0&size=20>; rel="last",<http://localhost/api/entreprise-plan-permissions?page=0&size=20>; rel="first"',
              },
              body: [entreprisePlanPermission],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(entreprisePlanPermissionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details EntreprisePlanPermission page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('entreprisePlanPermission');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlanPermission page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlanPermission');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
      });

      it('edit button click should load edit EntreprisePlanPermission page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntreprisePlanPermission');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
      });

      it('last delete button click should delete instance of EntreprisePlanPermission', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('entreprisePlanPermission').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entreprisePlanPermissionPageUrlPattern);

        entreprisePlanPermission = undefined;
      });
    });
  });

  describe('new EntreprisePlanPermission page', () => {
    beforeEach(() => {
      cy.visit(`${entreprisePlanPermissionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('EntreprisePlanPermission');
    });

    it('should create an instance of EntreprisePlanPermission', () => {
      cy.get(`[data-cy="description"]`).type('primary systems').should('have.value', 'primary systems');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        entreprisePlanPermission = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', entreprisePlanPermissionPageUrlPattern);
    });
  });
});
