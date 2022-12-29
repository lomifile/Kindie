/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	clearMocks: true,
	coverageProvider: "v8",
	verbose: true,
	moduleDirectories: ["node_modules", "src"],
	moduleFileExtensions: [
		"js",
		"mjs",
		"cjs",
		"jsx",
		"ts",
		"tsx",
		"json",
		"node"
	],
	resolver: undefined,
	roots: ["<rootDir>"],
	testMatch: ["**/test/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	testPathIgnorePatterns: ["/node_modules/"],
	testSequencer: "./scripts/testSequencer.js",
	transform: {
		"^.+\\.[tj]sx?$": ["ts-jest"],
		"^.+\\.m?[tj]sx?$": ["ts-jest"],
		"^.+\\.ts?$": ["ts-jest", {}]
	},
	transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
	testEnvironment: "node",
	moduleNameMapper: {
		"^@root/(.*)": "<rootDir>/src/$1",
		"^@orm/(.*)": "<rootDir>/src/orm/$1",
		"^@graphql/(.*)": "<rootDir>/src/graphql/$1",
		"^@libs/(.*)": "<rootDir>/src/libs/$1",
		"^@middleware/(.*)": "<rootDir>/src/middleware/$1",
		"^@types/(.*)": "<rootDir>/src/types/$1",
		"^@utils/(.*)": "<rootDir>/src/utils/$1",
		"^@helpers/(.*)": "<rootDir>/src/helpers/$1"
	}
};
