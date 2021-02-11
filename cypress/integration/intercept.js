import fs from 'fs';

it('Download contents should be the same', () => {
  cy.visit('http://localhost:3000/');
  cy.intercept('GET', 'http://localhost:3000/bad.pdf', function (req) {
    req.reply((res) => {
      res.delay(250).send();
    });
  }).as('bad');
  cy.contains('Download Good').click();
  cy.contains('Download Bad').click();
  cy.wait('@bad');
  cy.exec('ls -s cypress/downloads/').its('stdout').then(stdout => {
    const lines = stdout.split('\n');
    const badSize = lines[1].split(' ')[0];
    const goodSize = lines[2].split(' ')[0];
    expect(badSize).equals(goodSize);
  });
});
