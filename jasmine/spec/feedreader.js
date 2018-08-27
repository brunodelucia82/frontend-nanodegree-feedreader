/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a non-empty URL', function() {
            allFeeds.forEach(feed => expect(feed.url).toBeDefined()); 
            allFeeds.forEach(feed => expect(feed.url.length).toBeGreaterThan(0)); 
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a non-empty name', function() {
            allFeeds.forEach(feed => expect(feed.name).toBeDefined()); 
            allFeeds.forEach(feed => expect(feed.name.length).toBeGreaterThan(0)); 
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        
        const myMenu = document.querySelector('div.slide-menu');
        let style = window.getComputedStyle(myMenu);
        let matrix = function() {
            return new WebKitCSSMatrix(style.webkitTransform);
        };
        let hiddenLeft = function() { 
            return (matrix().m41 + myMenu.offsetWidth) <= 0;
        };
        let hiddenRight = function() { 
            return (matrix().m41) >= window.innerWidth;
        };
        let hidden = function() {
            return hiddenLeft() || hiddenRight() || (style.opacity === 0) || 
                (style.visibility === 'hidden') || (style.display === 'none');
            };
        let formerlyHidden;
        let afterClick1, afterClick2;
                    
        /*
         * Store in the variable formerlyHidden the menu's hidden status
         * before running any test
         */
        beforeAll(function (done) {
            formerlyHidden = hidden();
            
            clickTwice(function() {
                done();
            });
        });
        
        /*
         * Triggers click on the menu icon twice, recording each time the 
         * body's 'class' attribute in a different variable. Callback 
         * function added in order to be used in the beforeAll()
         */
        function clickTwice(cb) {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            setTimeout(function() {
                afterClick1 = document.querySelector('body').className;
                menuIcon.click();
                setTimeout(function() {
                    afterClick2 = document.querySelector('body').className;
                    if(cb) {
                        cb();
                    };
                }, 201);
            }, 201);
        }
        
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(formerlyHidden).toBe(true);
        });
         
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function(done) {
            expect(afterClick1).toBe('');
            expect(afterClick2).toBe('menu-hidden');
            done();
        });

    });

        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
           loadFeed(0, function() {
               done();
           });
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('.feed contains at least one .entry element', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        }); 
    })

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let oldContent, newContent;
        beforeEach(function(done) {
            oldContent = document.querySelector('div.feed').innerHTML; // feed content
                    // currently being displayed on the page (i.e. allFeeds[0])

            // loading the second feed on the page
            loadFeed(1, function() {
               done();
            });
        });
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('when a new feed is loaded the content actually changes', function(done) {
             newContent = document.querySelector('div.feed').innerHTML; // new feed content
                    // currently being displayed on the page (i.e. allFeeds[1])
             expect(oldContent).not.toBe(newContent);
             done();
         });
    })
        
}());
