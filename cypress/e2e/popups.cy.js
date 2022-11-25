describe("Popups and alerts", () => {
    beforeEach(() => {
        cy.visit("Popup-Alerts/index.html");
    });

    it("Validates the alert after click DOM element", () => {
        cy.on("window:alert", (str) => {
            expect(str).to.equal("I am an alert box!");
        });
        cy.get("#button1").scrollIntoView().click();
    });

    it("Validates the modal text after click DOM element", () => {
        cy.get("#button2")
            .scrollIntoView()
            .click()
            .then(() => {
                cy.get("#myModal").should("contain", "It’s that Easy");
            });
    });

    it("Closes modal after clicking X button", () => {
        cy.get("#button2")
            .scrollIntoView()
            .click()
            .then(() => {
                cy.get(".close")
                    .click()
                    .then(() => {
                        cy.get("#myModal").should("not.be.visible");
                    });
            });
    });

    it("Closes modal after clicking Close button", () => {
        cy.get("#button2")
            .scrollIntoView()
            .click()
            .then(() => {
                cy.get(".modal-footer button")
                    .click()
                    .then(() => {
                        cy.get("#myModal").should("not.be.visible");
                    });
            });
    });

    it("Validates JS message box works when clicking OK", () => {
        cy.get("#button4").scrollIntoView().click();
        cy.on("window:confirm", (str) => {
            return true;
        });
        cy.get("#confirm-alert-text").should("contain", "OK!");
    });

    it("Validates JS message box works when clicking Cancel", () => {
        cy.get("#button4").scrollIntoView().click();
        cy.on("window:confirm", (str) => {
            return false;
        });
        cy.get("#confirm-alert-text").should("contain", "Cancel!");
    });
});
