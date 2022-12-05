describe("Uploading files", () => {
    beforeEach(() => {
        cy.visit("/File-Upload/index.html");
    });

    it("Uploads a file", () => {
        cy.get("#myFile").selectFile("cypress/fixtures/laptop.jpg");
        cy.get("#submit-button").click();
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Your file has now been uploaded!");
        });
    });
    it("Upload no file", () => {
        cy.get("#submit-button").click();
        cy.on("window:alert", (str) => {
            expect(str).to.equal("You need to select a file to upload!");
        });
    });
});
