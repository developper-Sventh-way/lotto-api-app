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

describe('RequestTransaction e2e test', () => {
  const requestTransactionPageUrl = '/request-transaction-chad';
  const requestTransactionPageUrlPattern = new RegExp('/request-transaction-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const requestTransactionSample = { description: 'back model Croatia' };

  let requestTransaction;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/request-transactions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/request-transactions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/request-transactions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (requestTransaction) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/request-transactions/${requestTransaction.id}`,
      }).then(() => {
        requestTransaction = undefined;
      });
    }
  });

  it('RequestTransactions menu should load RequestTransactions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('request-transaction-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('RequestTransaction').should('exist');
    cy.url().should('match', requestTransactionPageUrlPattern);
  });

  describe('RequestTransaction page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(requestTransactionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create RequestTransaction page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/request-transaction-chad/new$'));
        cy.getEntityCreateUpdateHeading('RequestTransaction');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', requestTransactionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/request-transactions',
          body: requestTransactionSample,
        }).then(({ body }) => {
          requestTransaction = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/request-transactions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/request-transactions?page=0&size=20>; rel="last",<http://localhost/api/request-transactions?page=0&size=20>; rel="first"',
              },
              body: [requestTransaction],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(requestTransactionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details RequestTransaction page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('requestTransaction');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', requestTransactionPageUrlPattern);
      });

      it('edit button click should load edit RequestTransaction page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RequestTransaction');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', requestTransactionPageUrlPattern);
      });

      it('edit button click should load edit RequestTransaction page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RequestTransaction');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', requestTransactionPageUrlPattern);
      });

      it('last delete button click should delete instance of RequestTransaction', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('requestTransaction').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', requestTransactionPageUrlPattern);

        requestTransaction = undefined;
      });
    });
  });

  describe('new RequestTransaction page', () => {
    beforeEach(() => {
      cy.visit(`${requestTransactionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('RequestTransaction');
    });

    it('should create an instance of RequestTransaction', () => {
      cy.get(`[data-cy="description"]`).type('Rustic Chicken online').should('have.value', 'Rustic Chicken online');

      cy.get(`[data-cy="dateTransaction"]`).type('2023-03-02T22:41').blur().should('have.value', '2023-03-02T22:41');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        requestTransaction = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', requestTransactionPageUrlPattern);
    });
  });
});
