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

describe('DayTirage e2e test', () => {
  const dayTiragePageUrl = '/day-tirage-chad';
  const dayTiragePageUrlPattern = new RegExp('/day-tirage-chad(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const dayTirageSample = { tirageType: 'MATIN' };

  let dayTirage;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/day-tirages+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/day-tirages').as('postEntityRequest');
    cy.intercept('DELETE', '/api/day-tirages/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (dayTirage) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/day-tirages/${dayTirage.id}`,
      }).then(() => {
        dayTirage = undefined;
      });
    }
  });

  it('DayTirages menu should load DayTirages page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('day-tirage-chad');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DayTirage').should('exist');
    cy.url().should('match', dayTiragePageUrlPattern);
  });

  describe('DayTirage page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(dayTiragePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DayTirage page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/day-tirage-chad/new$'));
        cy.getEntityCreateUpdateHeading('DayTirage');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dayTiragePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/day-tirages',
          body: dayTirageSample,
        }).then(({ body }) => {
          dayTirage = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/day-tirages+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/day-tirages?page=0&size=20>; rel="last",<http://localhost/api/day-tirages?page=0&size=20>; rel="first"',
              },
              body: [dayTirage],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(dayTiragePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DayTirage page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('dayTirage');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dayTiragePageUrlPattern);
      });

      it('edit button click should load edit DayTirage page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DayTirage');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dayTiragePageUrlPattern);
      });

      it('edit button click should load edit DayTirage page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DayTirage');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dayTiragePageUrlPattern);
      });

      it('last delete button click should delete instance of DayTirage', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('dayTirage').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', dayTiragePageUrlPattern);

        dayTirage = undefined;
      });
    });
  });

  describe('new DayTirage page', () => {
    beforeEach(() => {
      cy.visit(`${dayTiragePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('DayTirage');
    });

    it('should create an instance of DayTirage', () => {
      cy.get(`[data-cy="tirageType"]`).select('SOIR');

      cy.get(`[data-cy="dateInString"]`).type('Towels collaborative Shirt').should('have.value', 'Towels collaborative Shirt');

      cy.get(`[data-cy="premierLot"]`).type('Federation Cotton mesh').should('have.value', 'Federation Cotton mesh');

      cy.get(`[data-cy="deuxiemeLot"]`).type('optimize alarm solutions').should('have.value', 'optimize alarm solutions');

      cy.get(`[data-cy="troisiemeLot"]`).type('Rustic').should('have.value', 'Rustic');

      cy.get(`[data-cy="pic3"]`).type('monitor Outdoors').should('have.value', 'monitor Outdoors');

      cy.get(`[data-cy="win4"]`).type('wireless').should('have.value', 'wireless');

      cy.get(`[data-cy="dateTransaction"]`).type('2023-03-03T10:53').blur().should('have.value', '2023-03-03T10:53');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        dayTirage = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', dayTiragePageUrlPattern);
    });
  });
});
