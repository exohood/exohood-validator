import * as helpers from "../../src/helpers";

it("should be a valid validate wallet address", () => {
  const isValid = helpers.validateWalletAddress(
    "BTC:1KvPQqQkmmCBS6X1Rbh5esi7pzLEt8FTgb"
  );
  expect(isValid).toBe(true);
});

it("should be a validate wallet address when network type is provided as testnet", () => {
  const isValid = helpers.validateWalletAddress(
    "ETH:0x2d4b003579ce7cf5d251f4d20feb25604426fd23:testnet"
  );
  expect(isValid).toBe(true);
});

it("should return false when a past year is provided", () => {
  const isValid = helpers.isPastYear("20");
  expect(isValid).toBe(true);
});
