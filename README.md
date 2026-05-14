# Lab 5 - Starter

Gabrielle Wang, No partner

1, No, I wouldn't use a unit test to test the entire "message" feature. Unit tests are meant to test individual, isolated pieces of code in "encapsulated units." Since sending a message involves the UI, the network, and a database all working together, a unit test "cannot test how these individual components interact with each other on an application/feature level." This would be better handled by an Integration or End-to-End (E2E) test.

2, Yes, I would definitely use a unit test for this. This is exactly what unit testing is for—it's a small, specific piece of logic that can be easily encapsulated into a function (like checking if string.length <= 80). Unit tests "execute quickly" and make "debugging on a small scale" much easier, so I can just pass in different string lengths to make sure the logic works without needing to run the whole app.