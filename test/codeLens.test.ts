import { strictEqual } from 'assert';
import { it, describe } from 'mocha';
import { findMainFunctionLineNumber, getFregeModuleName } from '../src/fregeCodeHelper'

describe('Can find the line number of the main function', () => {

    it('Given a frege file with a main function', () => {
        const fregeFileWithMainFunction =
            `module Test where
              frob a = (a, "Frege rocks")

              main = do
                println frob 2`;
        strictEqual(findMainFunctionLineNumber(fregeFileWithMainFunction), 3);
    });
});

describe('Return -1 as line number', () => {
    it('Given a frege file without a main function', () => {
        const fregeFileWithoutMainFunction =
            `module Test where
              frob a = (a, "Frege rocks")
            `;
        strictEqual(findMainFunctionLineNumber(fregeFileWithoutMainFunction), -1);
    });
});

describe('Can extract the module name', () => {
    it('Given a frege file with a fully qualified module name (my.mod.Name)', () => {
        const fregeFile =
            `module my.mod.Name where
              main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "my.mod.Name");
    });

    it('Given a frege file with a single module name (Name)', () => {
        const fregeFile =
            `module Test where
              main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "Test");
    });
});

describe('Return an empty string', () => {
    it('Given a frege file with no module name', () => {
        const fregeFile =
            `main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "");
    });
});
