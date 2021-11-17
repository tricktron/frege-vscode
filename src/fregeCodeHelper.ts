
const aWordBoundary = '\\b';
const zeroOrMoreWhiteSpaces = '\\s*';
const oneOrMoreWhiteSpaces = '\\s+'
const endOfLine = /\r?\n/;

export const findMainFunctionLineNumber = (fregeCode: string): number => {
    const mainRegex = new RegExp(`^${zeroOrMoreWhiteSpaces}main${aWordBoundary}`);
    return fregeCode.split(endOfLine).findIndex((line) => mainRegex.test(line));
}

export const getFregeModuleName = (fregeCode: string): string => {
    const aWordWithDots = '[a-zA-Z.]+';
    const moduleRegex = new RegExp(`${zeroOrMoreWhiteSpaces}module${oneOrMoreWhiteSpaces}(${aWordWithDots}${aWordBoundary})`)
    const moduleNamematch = fregeCode.match(moduleRegex);
    return moduleNamematch === null ? "" : moduleNamematch[1];
};