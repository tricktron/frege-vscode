#!/usr/bin/env bash

export CODE_TESTS_PATH="$(pwd)/out/e2eTest"
export CODE_TESTS_WORKSPACE="$(pwd)/test/testFixture"

node "$(pwd)/out/e2eTest/runTest"