# Frege VSCode
VSCode language client for frege

## Install
- Install nodejs `14.x`
- `git clone https://github.com/tricktron/frege-vscode.git`
- `npm install`

## How to use
- Open the project's root folder in vscode.
- Run the `launch client` debug task by pressing `run -> start debugging` or just press `f5`.

This downloads the [frege lsp server](https://github.com/tricktron/frege-lsp-server) and starts both the frege client and server. See the [extension.ts](src/extension.ts) code for more details.

A second vscode instance, called `Extension development host is started`.

Open any `.txt` file in the `extension development host` and type the letter `f`. You should get an autocomplete suggestion of `frege rocks`.

## How to Contribute
- Run `npm test` to execute the [unit tests](test)
- Close all vscode instances and run `npm run e2eTest` to run the [e2eTests](e2eTest)
- Add more tests and features
