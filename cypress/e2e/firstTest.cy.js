describe("home page check", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("renders default elements on the screen", () => {
    cy.get('[data-testid="cypress-home-h1"]')
      .should("exist")
      .should("have.text", "Home Page");
  });

  it("renders all songs in the song list", () => {
    // Get all song elements
    cy.get('[data-testid^="cypress-song"]').then(($songs) => {
      if ($songs.length > 0) {
        cy.wrap($songs).each(($song, index) => {
          cy.wrap($song).should("exist");

          // Additional checks here: checking if the song title is not empty
          cy.wrap($song).find(".song-title").should("not.be.empty");
        });
      } else {
        // If no songs are present, check for a "No songs" message
        cy.get(".no-songs-message")
          .should("exist")
          .and("contain", "No songs available");
      }
    });
  });
});
