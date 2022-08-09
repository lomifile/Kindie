const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  shard(tests, { shardIndex, shardCount }) {
    const shardSize = Math.ceil(tests.length / shardCount);
    const shardStart = shardSize * (shardIndex - 1);
    const shardEnd = shardStart * shardIndex;

    return [...tests]
      .sort((a, b) => (a.path > b.path ? 1 : -1))
      .slice(shardStart, shardEnd);
  }

  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA > testB ? 1 : -1));
  }
}

module.exports = CustomSequencer;
