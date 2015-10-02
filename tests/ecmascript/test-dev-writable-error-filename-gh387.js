/*
 *  https://github.com/svaarala/duktape/issues/387
 */

/*===
dummy
99999
Foo
	bar
	quux
["message","fileName","lineNumber","stack"]
===*/

function test() {
    var err = new Error('aiee');

    err.fileName = 'dummy';
    print(err.fileName);
    err.lineNumber = 99999;
    print(err.lineNumber);

    // Note that the stacktrace uses file/line information from the call
    // stack functions and will ignore the .fileName and .lineNumber "own"
    // properties.

    //print(err.stack)

    // You can override the .stack too.
    err.stack = 'Foo\n\tbar\n\tquux';
    print(err.stack);

    print(JSON.stringify(Object.getOwnPropertyNames(err)));
}

try {
    test();
} catch (e) {
    print(e.stack || e);
}
