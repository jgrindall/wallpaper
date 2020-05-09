declare module Chai {
    interface Assertion {
        sorted(a:any):Assertion;
        equalTo(a:any):Assertion;
    }
}
