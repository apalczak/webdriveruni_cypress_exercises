///<reference types="cypress"/>

describe("Scrolling", () => {
    beforeEach(() => {
        cy.visit("/Scrolling/index.html");
        cy.viewport(1920, 1080);
    });

    it("Scrolls to the first element", () => {
        cy.get("#zone1")
            .scrollIntoView()
            .trigger("mouseover")
            .should("contain", "Well done");
    });

    it("Count entries into second and third element", () => {
        for (let i = 0; i < 3; i++) {
            cy.get("#zone2").scrollIntoView().trigger("mouseover");
            cy.get("#zone3").scrollIntoView().trigger("mouseover");
        }
        cy.get("#zone2").should("contain", "3 Entries");
        cy.get("#zone3").should("contain", "3 Entries");
    });

    it("Moves cursor to certain coordinates", () => {
        const xEntryPoint = 100;
        const yEntryPoint = 50;
        cy.get("#zone4")
            .scrollIntoView()
            .trigger("mouseover", { x: xEntryPoint, y: yEntryPoint })
            .should("contain", `X: ${xEntryPoint + 382}`)
            .and("contain", `Y: ${yEntryPoint + 767}`);
    });
});
