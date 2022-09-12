describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'tero tester',
      username: 'tester',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened with login form', function () {
    cy.contains('log in to application');
    cy.get('form');
  });

  describe('login', function () {
    it('login with correct credentials', function () {
      cy.contains('log in to application');
      cy.get('#username').type('tester');
      cy.get('#password').type('test');
      cy.get('button').click();

      cy.contains('tero tester logged in');
    });

    it('login with  wrong credentials', function () {
      cy.contains('log in to application');
      cy.get('#username').type('tester');
      cy.get('#password').type('this_is_wrong');
      cy.get('button').click();

      cy.get('#notification-message')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in to application');
      cy.get('#username').type('tester');
      cy.get('#password').type('test');
      cy.get('button').click();

      cy.contains('tero tester logged in');

      cy.contains('create new blog').click();

      cy.get('#title').type('title1');
      cy.get('#author').type('author1');
      cy.get('#url').type('url1');
      cy.get('button').contains('create').click();
    });

    it('a blog can be created', function () {
      cy.contains('title1 author1');
    });

    it('a blog can be liked', function () {
      cy.contains('title1 author1');

      cy.get('button').contains('view').click();
      cy.get('button').contains('like').click();
      cy.contains('likes 1');
    });

    it('blog creator can remove blog', function () {
      cy.get('button').contains('view').click();
      cy.get('button').contains('remove').click();
      cy.on('window:confirm', () => true);
      cy.contains('blog removed successfully');
    });
  });

  describe.only('blogs sorted by amount of likes', function () {
    const blogs = [
      {
        title: 'title1',
        author: 'author1',
        url: 'url1',
      },
      {
        title: 'title2',
        author: 'author2',
        url: 'url2',
      },
      {
        title: 'title3',
        author: 'author3',
        url: 'url3',
      },
    ];

    beforeEach(function () {
      cy.contains('log in to application');
      cy.get('#username').type('tester');
      cy.get('#password').type('test');
      cy.get('button').click();

      cy.contains('tero tester logged in');

      cy.wrap(blogs).each((blog) => {
        cy.contains('create new blog').click();

        cy.get('#title').type(blog.title);
        cy.get('#author').type(blog.author);
        cy.get('#url').type(blog.url);
        cy.get('button').contains('create').click();
      });
      cy.wait(2000);
    });

    it('give likes to blogs and check sorting', function () {
      cy.contains(blogs[0].title).parent().contains('view').click();
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('hide').click();
      cy.wait(150);

      cy.contains(blogs[1].title).parent().contains('view').click();
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('hide').click();
      cy.wait(150);

      cy.contains(blogs[2].title).parent().contains('view').click();
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('like').click();
      cy.wait(150);
      cy.get('button').contains('hide').click();
      cy.wait(150);

      cy.reload();

      cy.get('.blog').eq(0).should('contain', blogs[2].title);
      cy.get('.blog').eq(1).should('contain', blogs[1].title);
      cy.get('.blog').eq(2).should('contain', blogs[0].title);
    });
  });
});
