describe("Test datepicker", () => {
    beforeEach(() => {
        cy.visit("/Datepicker/index.html");
    });

    it("Select date from datepicker", () => {
        let date = new Date();
        date.setDate(date.getDate() + 365);

        const year = date.getFullYear();
        const month = date.toLocaleString("en-GB", { month: "long" });

        const day = date.getDate();

        const selectMonthAndYear = () => {
            cy.get(".datepicker-dropdown")
                .find(".datepicker-switch")
                .first()
                .then((currentDate) => {
                    if (!currentDate.text().includes(year)) {
                        cy.get(".next").first().click();
                        selectMonthAndYear();
                    }
                })
                .then((currentDate) => {
                    if (!currentDate.text().includes(month)) {
                        cy.get(".next").first().click();
                        selectMonthAndYear();
                    }
                });
        };

        cy.get("#datepicker")
            .click()
            .then(() => {
                selectMonthAndYear();
            })
            .then(() => {
                cy.get(".day").contains(day).click();
            });

        const monthNumber = date.getMonth() + 1;
        let dayString = day;
        if (day <= 9) {
            dayString = `0${day}`;
        }
        const currentDateString = `${monthNumber}-${dayString}-${year}`;
        cy.get(".form-control").should("have.value", currentDateString);
    });
});
