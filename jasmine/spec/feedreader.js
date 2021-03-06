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

        /* Test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty
         */
         it('have a non-empty URL', function() {
            allFeeds.forEach(feed => { 
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }); 
         });

        /* Test that loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty
         */
         it('have a non-empty name', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }); 
         });
    });

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
         * Triggers click on the menu icon twice, recording each time in a 
         * different variable whether the body's 'class' attribute contains 
         * 'menu-hidden'. Callback function added in order to be used in 
         * the beforeAll()
         */
        function clickTwice(cb) {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            setTimeout(function() {
                afterClick1 = document.querySelector('body').classList.contains('menu-hidden');
                menuIcon.click();
                setTimeout(function() {
                    afterClick2 = document.querySelector('body').classList.contains('menu-hidden');
                    if(cb) {
                        cb();
                    };
                }, 1000);
            }, 1000);
        }
        
        /* 
         * Test that ensures the menu element is hidden by default 
         */
        it('is hidden by default', function() {
            expect(formerlyHidden).toBe(true);
        });
         
        /* 
         * Test that ensures the menu changes visibility when the menu icon is clicked
         */
        it('changes visibility when clicked', function(done) {
            expect(afterClick1).toBe(false);
            expect(afterClick2).toBe(true);
            done();
        });

    });

        

    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
           loadFeed(0, done);
        });
        /* 
         * Test that ensures when the loadFeed function is called 
         * and completes its work, there is at least a single .entry element
         * within the .feed container
         */
        it('.feed contains at least one .entry element', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        }); 
    })

    describe('New Feed Selection', function() {
        let oldContent, newContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                // loading the first feed on the page
                oldContent = document.querySelector('div.feed').innerHTML;
                loadFeed(1, done); // loading the second feed on the page
            });
        });
        
        /* 
         * Test that ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes
         */
         it('when a new feed is loaded the content actually changes', function(done) {
             newContent = document.querySelector('div.feed').innerHTML; // new feed content
                    // currently being displayed on the page (i.e. allFeeds[1])
             expect(oldContent).not.toBe(newContent);
             done();
         });
    })
        
}());
