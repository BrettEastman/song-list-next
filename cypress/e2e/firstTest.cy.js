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
      // Check if there are any songs
      if ($songs.length > 0) {
        // Iterate through each song
        cy.wrap($songs).each(($song, index) => {
          // Check if the song exists
          cy.wrap($song).should("exist");

          // You can add more specific checks here if needed
          // For example, checking if the song title is not empty
          cy.wrap($song).find(".song-title").should("not.be.empty");
        });
      } else {
        // If no songs are present, you might want to check for a "No songs" message
        cy.get(".no-songs-message")
          .should("exist")
          .and("contain", "No songs available");
      }
    });
  });
});
