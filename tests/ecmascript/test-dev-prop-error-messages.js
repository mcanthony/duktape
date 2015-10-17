/*
 *  Fragile testcase for testing property error messages.
 */

/*---
{
    "custom": true
}
---*/

/*===
===*/

function test() {
    // Basic cases
    try {
        print(null.foo);
    } catch (e) {
        print(e);
    }
    try {
        undefined.foo = 123;
    } catch (e) {
        print(e);
    }
    try {
        delete null.foo;
    } catch (e) {
        print(e);
    }

    // The same internal summarization API call is used for summarizing
    // object and key.  The summary must be human readable, limited length,
    // and side effect free.  Test a few basic cases.

    var longstring = 'x'
    for (var i = 0; i < 20; i++) { longstring += longstring; }
    [
        undefined, null, true, false, 123, 123.0, -0, +0, 0/0, 1/0, -1/0,
        '', 'foo',
        '12345678901234567890123456789012',  // 32 chars is currently shown as is
        '12345678901234567890123456789012x',
        '1234\u0000678901234567890123456789012',  // 32 chars, internal NUL
        '\u1234foo',  // unicode
        '\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345',  // 32 unicode chars
        '\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\u1234\u2345\ucafe',  // 33 unicode chars
        longstring,
        [ 1,2 , 3 ],
        { foo:'bar' },
        function test() {},
        Duktape.Pointer('dummy'),
        new Duktape.Pointer('dummy'),
        Duktape.Buffer('dummy'),
        new Duktape.Buffer('dummy'),
    ].forEach(function (v) {
        try {
            null[v] = 123;
        } catch (e) {
            print(e);
        }
    });
}

try {
    test();
} catch (e) {
    print(e.stack || e);
}
