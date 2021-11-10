import { EOL } from "os";
import { CancellationToken, CodeLens, CodeLensProvider, Event, ProviderResult, TextDocument } from "vscode";

const zeroOrMoreWhiteSpaces = '\\s*';
const aWordBoundary = '\\b';
const mainRegex = new RegExp(`^${zeroOrMoreWhiteSpaces}main${aWordBoundary}`);
export const FREGE_RUN_CODELENS_COMMNAD = "frege-vscode.runCodeLens";
export const FREGE_REPL_CODELENS_COMMNAD = "frege-vscode.replCodeLens";

export class MainCodeLensProvider implements CodeLensProvider {
    onDidChangeCodeLenses?: Event<void>;
    provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
        const mainLineNumber = findMainFunctionLineNumber(document.getText());
        if (mainLineNumber === -1) {
            return [];
        } else {
            const mainRange = document.lineAt(mainLineNumber).range;
            return Array.of(new CodeLens(mainRange, {
                title: "Run",
                command: FREGE_RUN_CODELENS_COMMNAD,
                tooltip: "Run Frege Program",
                arguments: [document.uri.fsPath]
            }), new CodeLens(mainRange, {
                title: "Repl",
                command: FREGE_REPL_CODELENS_COMMNAD,
                tooltip: "Run Frege Repl",
                arguments: [document.uri.fsPath]
            }));
        }
    }
}

export const findMainFunctionLineNumber = (fregeFile: string): number => {
    return fregeFile.split(EOL).findIndex((line) => mainRegex.test(line));
}