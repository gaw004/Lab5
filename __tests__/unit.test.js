// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// 1. Test for isEmail function
test('test for isEmail function', () => {
  // False matches (based on your specific regex logic)
  expect(isEmail('user.name@test.com')).toBe(false); // Username has a dot
  expect(isEmail('dev@company.digital')).toBe(false); // Suffix is > 3 chars
  // True matches
  expect(isEmail('hi@me.ai')).toBe(true);
  expect(isEmail('hello@world.com')).toBe(true);
});

// 2. Test for isPhoneNumber function
test('test for isPhoneNumber function', () => {
  // False matches
  expect(isPhoneNumber('5555-1234')).toBe(false); // 4 digits at start
  expect(isPhoneNumber('12-3456')).toBe(false);   // 2 digits in middle
  // True matches
  expect(isPhoneNumber('(123) 456-7890')).toBe(true);
  expect(isPhoneNumber('123-4567')).toBe(true);
});

// 3. Test for isStrongPassword function
test('test for isStrongPassword function', () => {
  // False matches
  expect(isStrongPassword('1Apple')).toBe(false); // Starts with number
  expect(isStrongPassword('ThisNameIsWayTooLongForThis')).toBe(false); // > 15 chars
  // True matches
  expect(isStrongPassword('a1_b')).toBe(true);
  expect(isStrongPassword('User123')).toBe(true);
});

// 4. Test for isDate function
test('test for isDate function', () => {
  // False matches
  expect(isDate('1/1/2026 ')).toBe(false); // Extra space at end
  expect(isDate('May/13/2026')).toBe(false); // Contains letters
  // True matches
  expect(isDate('5/13/2026')).toBe(true);
  expect(isDate('05/13/2026')).toBe(true);
});

// 5. Test for isHexColor function (Added this for you)
test('test for isHexColor function', () => {
  // False matches
  expect(isHexColor('blue')).toBe(false);   // Not hex
  expect(isHexColor('#12345')).toBe(false); // Only 5 digits (needs 3 or 6)
  // True matches
  expect(isHexColor('#abc')).toBe(true);    // 3 digits with #
  expect(isHexColor('FFFFFF')).toBe(true); // 6 digits without #
});