describe("Working with data, tables and button states", () => {
    beforeEach(() => {
        cy.visit("/Data-Table/index.html");
    });
    it("Finds max age in table", () => {
        let maxAge = 0;
        cy.get("#t01")
            .find("tr")
            .each(($row, index, $list) => {
                if (index > 0) {
                    cy.wrap($row)
                        .find("td")
                        .last()
                        .then((lastCellInRow) => {
                            const age = Number(lastCellInRow.text());
                            cy.log("Age: " + age);
                            if (age > maxAge) {
                                maxAge = age;
                            }
                        });
                }
            })
            .then(() => {
                expect(maxAge).to.eq(94);
            });
    });
});
