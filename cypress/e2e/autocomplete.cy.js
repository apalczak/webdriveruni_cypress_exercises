describe("Autocomplete dropdown lists", () => {
    beforeEach(() => {
        cy.visit("/Autocomplete-TextField/autocomplete-textfield.html");
    });

    it("Select specific values via select dropdown with autocomplete", () => {
        cy.get("#myInput").type("A");
        cy.get("#myInputautocomplete-list > *").each(($el, index, $list) => {
            const product = $el.text();
            const productToSelect = "Avacado";
            if (product === productToSelect) {
                $el.click();
                cy.get("#submit-button").click();
            }
        });
        cy.url().should("include", "Avacado");
    });
});
