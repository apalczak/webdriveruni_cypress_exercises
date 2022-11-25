describe("Preform mouse drag and drop actions", () => {
    beforeEach(() => {
        cy.visit("/Actions/index.html");
    });

    it("Drags DOM element to designated place", () => {
        cy.get("#draggable")
            .scrollIntoView()
            .trigger("mousedown", { which: 1 });
        cy.get("#droppable")
            .scrollIntoView()
            .trigger("mousemove")
            .trigger("mouseup", { force: true })
            .should("contain", "Dropped");
    });

    it("Double-click DOM element", () => {
        cy.get("#double-click")
            .scrollIntoView()
            .dblclick()
            .should("have.class", "double");
    });

    it("Expand DOM element when hover over it", () => {
        cy.get("#div-hover button").each(($button, index, $list) => {
            cy.wrap($button)
                .scrollIntoView()
                .realHover()
                .next()
                .find("a")
                .first()
                .trigger("mousemove")
                .click();
        });
        cy.on("window:alert", (str) => {
            expect(str).to.contain("Well done");
        });
    });

    it("Hold DOM element with cursor", () => {
        cy.get("#click-box")
            .scrollIntoView()
            .trigger("mousedown")
            .should("contain.text", "Well done");
    });
});
