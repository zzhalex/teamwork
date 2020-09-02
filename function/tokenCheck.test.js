const {
	generateJWT,
	decodeJWT
} = require("./tokenCheck")

let user = { username: "aa", id: 9 };
let jwt = generateJWT(user);

test('Check WT', () => {
  expect(decodeJWT(jwt).user.id).toBe(9);
});


