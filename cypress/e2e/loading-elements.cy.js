describe("Test accordion elements", () => {
    beforeEach(() => {
        cy.visit("");
        cy.get(":nth-child(6) > #page-object-model")
            .scrollIntoView()
            .invoke("removeAttr", "target")
            .click({ force: true });
    });

    it("Test Manual Testing section opening and closing", () => {
        cy.get("#manual-testing-accordion").scrollIntoView().click();
        cy.get("#manual-testing-description")
            .invoke("height")
            .should("be.greaterThan", 10);
        cy.get("#manual-testing-accordion").scrollIntoView().click();
        cy.get("#manual-testing-description")
            .invoke("height")
            .should("be.lessThan", 10);
    });

    it("Open and close the Cucumber BDD section", () => {
        cy.get("#cucumber-accordion").scrollIntoView().click();
        cy.get("#cucumber-testing-description")
            .invoke("height")
            .should("be.greaterThan", 10);
        cy.get("#cucumber-accordion").scrollIntoView().click();
        cy.get("#cucumber-testing-description")
            .invoke("height")
            .should("be.lessThan", 10);
    });

    it("Open and close the Automation Testing section", () => {
        cy.get("#automation-accordion").scrollIntoView().click();
        cy.get("#automation-testing-description")
            .invoke("height")
            .should("be.greaterThan", 10);
        cy.get("#automation-accordion").scrollIntoView().click();
        cy.get("#automation-testing-description")
            .invoke("height")
            .should("be.lessThan", 10);
    });

    it("Open and close the section with random activation delay", () => {
        cy.waitUntil(
            () => {
                return cy.get("#hidden-text").then((text) => {
                    if (text.text() === "LOADING.. PLEASE WAIT..") {
                        return false;
                    }
                });
            },
            { timeout: 11000, interval: 500 }
        );
        cy.get("#click-accordion").scrollIntoView().click();
        cy.get("#timeout").invoke("height").should("be.greaterThan", 10);
        cy.get("#click-accordion").scrollIntoView().click();
        cy.get("#timeout").invoke("height").should("be.lessThan", 10);
    });
});
