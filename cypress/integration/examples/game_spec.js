describe('Visit website', () => {
    it('Visits the Game of Set website', () => {
      cy.visit('../page1.html')
    })
})

describe('Find and Click Button', () => {
    it('Find and click Deal', () => {
        cy.contains('button','Deal').click();
    })
})

describe('Find and Click Button', () => {
    it('Find and click Deck to see number remaining cards', () => {
        cy.contains('button','Deck').click();
    })
})

describe('Find and Click Button', () => {
    it('Find and click Hint', () => {
        cy.contains('button','Hint').click();
    })
})

describe('Find and Click Button', () => {
    it('Random button does not exist', () => {
        cy.contains('button','Random').should('not.exist');
    })
})

describe('Cards', () => {
    it('Size of board after deal should be 15', () => {
        cy.get('.cardWrapper').children().should('have.length', 15);
    })
})

describe('Select Cards', () => {
    it('Select 3 Cards and check if it is a set', () => {
        cy.get('.cardWrapper div').eq(1).click()
        cy.get('.cardWrapper div').eq(5).click()
        cy.get('.cardWrapper div').eq(9).click()
    })
})


describe('Select Cards', () => {
    it('Select 3 Cards and check if it is a set', () => {
        cy.get('.cardWrapper div').eq(3).click()
        cy.get('.cardWrapper div').eq(6).click()
        cy.get('.cardWrapper div').eq(11).click()
    })
})

describe('Find and Click Button', () => {
    it('Find and click New Game to start a new game', () => {
        cy.contains('button','NewGame').click();
    })
})

describe('Select Cards', () => {
    it('Select 3 Cards and check if it is a set', () => {
        cy.get('.cardWrapper div').eq(5).click()
        cy.get('.cardWrapper div').eq(4).click()
        cy.get('.cardWrapper div').eq(6).click()
    })
})

describe('Select Cards', () => {
    it('Select 3 Cards and check if it is a set', () => {
        cy.get('.cardWrapper div').eq(0).click()
        cy.get('.cardWrapper div').eq(11).click()
        cy.get('.cardWrapper div').eq(2).click()
    })
})

describe('Find and Click Button', () => {
    it('Find and click Quit to stop game', () => {
        cy.contains('button','Quit').click();
    })
})






