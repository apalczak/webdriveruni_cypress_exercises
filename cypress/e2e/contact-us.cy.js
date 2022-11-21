///<reference types="cypress"/>

describe("Test Contact Us form on WebDriverUniversity page", () => {
    before(() => {});

    beforeEach(() => {
        cy.fixture("contact-us").as("contact-us");
        cy.visit("");
        cy.get("#contact-us")
            .scrollIntoView()
            .invoke("removeAttr", "target")
            .click({ force: true });
    });

    it("Submit the form with correct data", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="first_name"]').type(contactUs.firstName);
            cy.get('[name="last_name"]').type(contactUs.lastName);
            cy.get('[name="email"]').type(contactUs.email);
            cy.get('[name="message"]').type(contactUs.message);
        });
        cy.get('#form_buttons > [type="submit"]').click();
        cy.get("h1").should("have.text", "Thank You for your Message!");
    });

    it("Prevent form submit without a first name", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="last_name"]').type(contactUs.lastName);
            cy.get('[name="email"]').type(contactUs.email);
            cy.get('[name="message"]').type(contactUs.message);
        });
        cy.get('#form_buttons > [type="submit"]').click();
        cy.get("body").should("contain", `Error: all fields are required`);
    });

    it("Prevent form submit without a last name", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="first_name"]').type(contactUs.firstName);
            cy.get('[name="email"]').type(contactUs.email);
            cy.get('[name="message"]').type(contactUs.message);
        });
        cy.get('#form_buttons > [type="submit"]').click();
        cy.get("body").should("contain", `Error: all fields are required`);
    });

    it("Prevent form submit without an email address", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="first_name"]').type(contactUs.firstName);
            cy.get('[name="last_name"]').type(contactUs.lastName);
            cy.get('[name="message"]').type(contactUs.message);
        });
        cy.get('#form_buttons > [type="submit"]').click();
        cy.get("body").should("contain", `Error: all fields are required`);
    });

    it("Prevent form submit with invalid email address", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="first_name"]').type(contactUs.firstName);
            cy.get('[name="last_name"]').type(contactUs.lastName);
            cy.get('[name="email"]').type("Not an email adress");
            cy.get('[name="message"]').type(contactUs.message);
        });
        cy.get('#form_buttons > [type="submit"]').click();
        cy.get("body").should("contain", `Error: Invalid email address`);
    });

    it("Clear the form after clicking Reset button", () => {
        cy.get("@contact-us").then((contactUs) => {
            cy.get('[name="first_name"]').type(contactUs.firstName);
            cy.get('[name="last_name"]').type(contactUs.lastName);
            cy.get('[name="email"]').type(contactUs.email);
            cy.get('[name="message"]').type(contactUs.message);

            cy.get('[name="first_name"]').should(
                "have.value",
                contactUs.firstName
            );
            cy.get('[name="last_name"]').should(
                "have.value",
                contactUs.lastName
            );
            cy.get('[name="email"]').should("have.value", contactUs.email);
            cy.get('[name="message"]').should("have.value", contactUs.message);

            cy.get('#form_buttons > [type="reset"]').click();

            cy.get('[name="first_name"]').should("have.value", "");
            cy.get('[name="last_name"]').should("have.value", "");
            cy.get('[name="email"]').should("have.value", "");
            cy.get('[name="message"]').should("have.value", "");
        });
    });
});
