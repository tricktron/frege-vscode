import { strictEqual } from 'assert';
import { it, describe } from 'mocha';
import { findMainFunctionLineNumber } from '../src/mainCodeLensProvider'

describe('Can find the line number of the main function', () => {

    it('Given a frege file with a main function', () => {
        const fregeFileWithMainFunction =
            `module Test where
              frob a = (a, "Frege rocks")

              main = do
                putStrLn frob 2`;
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