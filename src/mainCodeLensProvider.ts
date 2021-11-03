import { EOL } from "os";
import { CancellationToken, CodeLens, CodeLensProvider, Event, ProviderResult, TextDocument } from "vscode";

const zeroOrMoreWhiteSpaces = '\\s*';
const aWordBoundary = '\\b';
const mainRegex = new RegExp(`^${zeroOrMoreWhiteSpaces}main${aWordBoundary}`);

class MainCodeLensProvider implements CodeLensProvider {
    onDidChangeCodeLenses?: Event<void>;
    provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
        throw new Error("Method not implemented.");
    }
    resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens> {
        throw new Error("Method not implemented.");
    }

}

export const findMainFunctionLineNumber = (fregeFile: string): number => {
    return fregeFile.split(EOL).findIndex((line) => mainRegex.test(line));
}