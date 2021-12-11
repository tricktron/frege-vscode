import { CancellationToken, CodeLens, CodeLensProvider, Event, ProviderResult, TextDocument } from "vscode";
import { findMainFunctionLineNumber, getFregeModuleName } from "./fregeCodeHelper";

export const FREGE_RUN_CODELENS_COMMNAND = "frege-vscode.runCodeLens";
export const FREGE_REPL_CODELENS_COMMNAND = "frege-vscode.replCodeLens";

export class MainCodeLensProvider implements CodeLensProvider {
    onDidChangeCodeLenses?: Event<void>;
    provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
        const fregeCode = document.getText();
        const mainLineNumber = findMainFunctionLineNumber(fregeCode);
        const moduleName = getFregeModuleName(fregeCode);
        if (mainLineNumber === -1 || moduleName === "") {
            return [];
        } else {
            const mainRange = document.lineAt(mainLineNumber).range;
            return Array.of(new CodeLens(mainRange, {
                title: "Run",
                command: FREGE_RUN_CODELENS_COMMNAND,
                tooltip: "Run Frege Program",
                arguments: [`--mainModule=${moduleName}`]
            }), new CodeLens(mainRange, {
                title: "Repl",
                command: FREGE_REPL_CODELENS_COMMNAND,
                tooltip: "Start Frege Repl",
                arguments: [document.uri.fsPath]
            }));
        }
    }
}

