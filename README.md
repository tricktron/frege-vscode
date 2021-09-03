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

Open any `.fr` file in the `extension development host` and try to code some correct Frege functions.

## Features

### Diagnostics
If you save or open a frege file with errros then the compiler warnings or errors are displayed in the problem tab of the extension host.

![diagnostics](.img/diagnostics.png)

### Hover

Whenever you hover over the first word of a line (which is usually a function), you will see its type signature in a popup.

![hover](.img/frob-hover.png)



## How to Contribute
- Run `npm test` to execute the [unit tests](test)
- Add more tests and features
