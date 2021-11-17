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

    it('Given a frege file without a main function', () => {
        const fregeFileWithoutMainFunction =
            `module Test where
              frob a = (a, "Frege rocks")
            `;
        strictEqual(findMainFunctionLineNumber(fregeFileWithoutMainFunction), -1);
    });
});

describe('Can extract the module name', () => {
    it('Given a frege file', () => {
        const fregeFile =
            `module my.mod.Name where
              main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "my.mod.Name");
    });

    it('Given a frege file with a single module name', () => {
        const fregeFile =
            `module Test where
              main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "Test");
    });

    it('Given a frege file with a no module name', () => {
        const fregeFile =
            `main = do
                println "Frege rocks"`;
        strictEqual(getFregeModuleName(fregeFile), "");
    });
});