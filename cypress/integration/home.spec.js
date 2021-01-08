describe("tests for Homepage", function () {
  describe("Homepage content", function () {
    it("has the content displayed", function () {
      cy.visit("/");
      cy.get("h1").contains("Alpha-Finance");
    });
  });
});
