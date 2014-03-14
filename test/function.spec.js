/**
 * saber-lang test case
 * 
 * @file function
 * @author zfkun(zfkun@msn.com)
 */

define(function( require ) {

    var throttle = require( 'saber-lang/function/throttle' );
    var debounce = require( 'saber-lang/function/debounce' );

    describe( 'function', function() {

        describe( '.throttle', function () {

            it( 'should exists', function () {
                expect( typeof throttle ).toEqual( 'function' );
            });

            it( 'should return a function', function () {
                expect( typeof throttle( function () {}, 50 ) ).toEqual( 'function' );
            });

            it( 'should call `fn` immediately when `options` is undefined', function () {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30 );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 1 );
            });

            it( 'should call `fn` at end when `options` is undefined', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30 );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 1 );

                setTimeout(function () {
                    expect( counter ).toEqual( 2 );
                    done();
                }, 32);
            });

            it( 'should call `fn` immediately everytime when `wait` less than 0', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 0 );
                var addThrottle2 = throttle( add, -2 );

                addThrottle();
                addThrottle();
                addThrottle2();
                addThrottle2();

                expect( counter ).toEqual( 4 );

                addThrottle();
                addThrottle2();

                expect( counter ).toEqual( 6 );

                setTimeout(function () {
                    expect( counter ).toEqual( 6 );
                    done();
                }, 20);
            });

            it( 'should not call `fn` immediately when `options.leading` is false', function () {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30, { leading: false } );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 0 );
            });


            it( 'should call `fn` at end when `options.leading` is false', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30, { leading: false } );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 0 );


                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    done();
                }, 32);
            });

            it( 'should call `fn` immediately when `options.trailing` is false', function () {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30, { trailing: false } );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 1 );
            });

            it( 'should not call `fn` at end when `options.trailing` is false', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30, { trailing: false } );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 1 );

                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    done();
                }, 32);
            });

            it( 'should not call `fn` when `options.leading` and `options.trailing` both false', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addThrottle = throttle( add, 30, { leading: false, trailing: false } );

                addThrottle();
                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 0 );

                setTimeout(function () {
                    expect( counter ).toEqual( 0 );
                    done();
                }, 32);
            });

            it( 'should call `fn` with context which `options.context` specified', function () {
                var result = null;
                var add = function () {
                    result = this === myContext;
                };
                var myContext = {};
                var addThrottle = throttle( add, 30, { context: myContext } );

                addThrottle();

                expect( result ).toEqual( true );
            });

            it( 'should call `fn` with context at end which `options.context` specified when `options.leading` is false', function ( done ) {
                var result = null;
                var counter = 0;
                var add = function () {
                    counter++;
                    result = this === myContext;
                };
                var myContext = {};
                var addThrottle = throttle( add, 30, { context: myContext, leading: false } );

                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 0 );
                expect( result ).toEqual( null );

                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    expect( result ).toEqual( true );
                    done();
                }, 32);
            });

            it( 'should call `fn` with context immediately which `options.context` specified when `options.trailing` is false', function ( done ) {
                var result = null;
                var counter = 0;
                var add = function () {
                    counter++;
                    result = this === myContext;
                };
                var myContext = {};
                var addThrottle = throttle( add, 30, { context: myContext, trailing: false } );

                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 1 );
                expect( result ).toEqual( true );

                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    expect( result ).toEqual( true );
                    done();
                }, 32);
            });

            it( 'should not call `fn` with context which `options.context` specified when `options.leading` and `options.trailing` both false', function ( done ) {
                var result = null;
                var counter = 0;
                var add = function () {
                    counter++;
                    result = this === myContext;
                };
                var myContext = {};
                var addThrottle = throttle( add, 30, { context: myContext, leading: false, trailing: false } );

                addThrottle();
                addThrottle();

                expect( counter ).toEqual( 0 );
                expect( result ).toEqual( null );

                setTimeout(function () {
                    expect( counter ).toEqual( 0 );
                    expect( result ).toEqual( null );
                }, 32);

                setTimeout(function () {
                    expect( counter ).toEqual( 0 );
                    expect( result ).toEqual( null );
                    done();
                }, 64);
            });

        });

        describe( '.debounce', function () {

            it( 'should exists', function () {
                expect( typeof debounce ).toEqual( 'function' );
            });

            it( 'should return a function', function () {
                expect( typeof debounce( function () {}, 50 ) ).toEqual( 'function' );
            });

            it( 'should call `fn` immediately when `immediate` is true', function () {
                var counter = 0;
                var add = function () { counter++; };
                var addDebounce = debounce( add, 30, true );

                addDebounce();

                expect( counter ).toEqual( 1 );
            });

            it( 'should call `fn` finally when `immediate` is false', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addDebounce = debounce( add, 30, false );

                addDebounce();
                addDebounce();
                addDebounce();

                setTimeout(function () {
                    expect( counter ).toEqual( 0 );
                }, 20);

                addDebounce();

                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    done();
                }, 32);
            });

            it( 'should call `fn` finally whithout `immediate`', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addDebounce = debounce( add, 30 );

                addDebounce();
                addDebounce();
                addDebounce();

                setTimeout(function () {
                    expect( counter ).toEqual( 0 );
                }, 20);

                addDebounce();

                setTimeout(function () {
                    expect( counter ).toEqual( 1 );
                    done();
                }, 32);
            });

            it( 'should call `fn` immediately everytime when `wait` less than 0', function ( done ) {
                var counter = 0;
                var add = function () { counter++; };
                var addDebounce = debounce( add, 0 );
                var addDebounce2 = debounce( add, -2 );

                addDebounce();
                addDebounce();
                addDebounce2();
                addDebounce2();

                expect( counter ).toEqual( 4 );

                addDebounce();
                addDebounce2();

                expect( counter ).toEqual( 6 );

                setTimeout(function () {
                    expect( counter ).toEqual( 6 );
                    done();
                }, 20);
            });

        });

    });

});
