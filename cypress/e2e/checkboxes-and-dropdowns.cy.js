///<reference types="cypress"/>

describe("Test checkboxes, dropdowns and radio-buttons", () => {
    beforeEach(() => {
        cy.visit("");
        cy.get("#dropdown-checkboxes-radiobuttons")
            .scrollIntoView()
            .invoke("removeAttr", "target")
            .click({ force: true });
    });
    it("Select item from first dropdown", () => {
        cy.get("#dropdowm-menu-1")
            .scrollIntoView()
            .select("Python")
            .should("have.value", "python");
    });
    it("Select item from second dropdown", () => {
        cy.get("#dropdowm-menu-2")
            .scrollIntoView()
            .select("Maven")
            .should("have.value", "maven");
    });
    it("Select item from third dropdown", () => {
        cy.get("#dropdowm-menu-3")
            .scrollIntoView()
            .select("JavaScript")
            .should("have.value", "javascript");
    });
    it("Check/uncheck checkboxes", () => {
        cy.get("#checkboxes input").each(($item, index, $list) => {
            cy.wrap($item).check().should("be.checked");
        });
        cy.get("#checkboxes input").each(($item, index, $list) => {
            cy.wrap($item).uncheck().should("not.be.checked");
        });
    });
    it("Check/uncheck multiple checkboxes", () => {
        cy.get("input[type='checkbox']")
            .check(["option-1", "option-2", "option-3", "option-4"])
            .should("be.checked");
        cy.get("input[type='checkbox']")
            .uncheck(["option-1", "option-2", "option-3", "option-4"])
            .should("not.be.checked");
    });
    it("Check and validate radio-buttons", () => {
        cy.get('#radio-buttons input[type="radio"]').each(
            ($element, index, $list) => {
                cy.wrap($element).check().should("be.checked");
            }
        );
        // Not sure, if solution below assert all radio-buttons or only the last
        // cy.get("#radio-buttons")
        //     .find("[type='radio']")
        //     .check()
        //     .should("be.checked");
    });
    it("Checks if item from radio/dropdown is disabled", () => {
        cy.fixture("is-disabled").then((isDisabled) => {
            isDisabled.radioButtonStates.forEach((item) => {
                cy.get(
                    `#radio-buttons-selected-disabled input[value="${item.name}"]`
                ).should(item.disabled ? "be.disabled" : "not.be.disabled");
            });
            isDisabled.dropdownStates.forEach((item) => {
                cy.get(`#fruit-selects option[value="${item.name}"]`).should(
                    item.disabled ? "be.disabled" : "not.be.disabled"
                );
            });
        });
    });
});
