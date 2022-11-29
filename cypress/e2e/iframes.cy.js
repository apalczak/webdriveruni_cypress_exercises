describe("Handling IFrames", () => {
    beforeEach(() => {
        cy.visit("/IFrame/index.html");
    });
    it("Manipulate elements inside IFrame", () => {
        cy.get("#frame").then(($frame) => {
            const body = $frame.contents().find("body");
            cy.wrap(body).as("iframe");
            cy.get("@iframe").find("#button-find-out-more").click();
            cy.get("@iframe").find("#myModal").as("modal");
            cy.get("@modal").should(($expectedText) => {
                const text = $expectedText.text();
                expect(text).to.include("Welcome to webdriveruniversity.com");
            });
            cy.get("@modal").contains("Close").click();
        });
    });
});
