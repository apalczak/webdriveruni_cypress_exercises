///<reference types="cypress"/>

describe("Test To-Do List on WebDriverUniversity page", () => {
    beforeEach(() => {
        cy.fixture("to-do-list").as("to-do-list");
        cy.visit("http://www.webdriveruniversity.com/");
        cy.get("#to-do-list")
            .invoke("removeAttr", "target")
            .click({ force: true });
    });

    it("Hide and show Add new todo input field", () => {
        cy.get("#plus-icon").click();
        cy.get("input").should("be.hidden");
        cy.get("#plus-icon").click();
        cy.get("input").should("be.visible");
    });

    it("Add/remove elements to/from the list", () => {
        cy.get("@to-do-list").then((toDoList) => {
            toDoList.multipleItems.forEach((listItem) => {
                cy.get("ul").children().as("numberOfItemsBefore");
                cy.get("input").type(listItem + "{enter}");
                cy.get("li")
                    .contains(listItem)
                    .should("have.text", " " + listItem);
                cy.get("@numberOfItemsBefore").then((numberOfItemsBefore) => {
                    cy.get("ul")
                        .children()
                        .should("have.length", numberOfItemsBefore.length + 1);
                });
            });
            toDoList.multipleItems.forEach((listItem) => {
                cy.get("ul").children().as("numberOfItemsBefore");
                cy.get("li")
                    .contains(listItem)
                    .children("span")
                    .realHover()
                    .click({ force: true });
                cy.get("ul").should("not.have.html", listItem);
                cy.get("@numberOfItemsBefore").then((numberOfItemsBefore) => {
                    cy.get("ul")
                        .children()
                        .should("have.length", numberOfItemsBefore.length - 1);
                });
            });
        });
    });

    it("Check/uncheck to-do as completed after click", () => {
        cy.get("ul")
            .children(":nth-child(1)")
            .scrollIntoView()
            .trigger("mouseover")
            .click()
            .should("have.class", "completed");
        cy.get("ul")
            .children(":nth-child(1)")
            .scrollIntoView()
            .trigger("mouseover")
            .click()
            .should("not.have.class", "completed");
    });
});
