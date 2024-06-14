'use strict';

//import App from './app';
import Shell from './shell.js';

const Commands = new Map();

/*
    `Commands` is a `Map` where:
    - Keys are strings.
    - Values are arrays of length 2 with
    the description and the function respectively.

Commands.set("example", ["example",
    (args) => {
        Shell.echo("example!");
        Shell.echo(args);
    }
]);
*/

Commands.set("clear", ["Clear the screen",
    () => {
        Shell.clear();
    }
]);

Commands.set("echo", ["Output some text (no quotes)",
    (args) => {
        Shell.echo(args.join(" "));
    }
]);

Commands.set("exit", ["Exit the terminal",
    (args) => {
        let mode = args[0] || "shutdown";

        switch (mode) {
            case "restart":
                location.reload();
                break;
            case "shutdown":
                window.close();
                break;
            default:
                const echo = Shell.echo;

                echo("Usage: exit [MODE]");
                echo();
                echo('MODE: defaults to "shutdown"');
                echo('\t"restart": reload the terminal', true);
                echo('\t"shutdown": close the terminal', true);
                break;
        }
    }
]);


Commands.set("hist", ["Manipulate terminal history",
    (args) => {
        let command = args[0] || "list";

        switch (command) {
            case "list":
                // List terminal history
                Shell.hist.forEach((item) => {Shell.echo(item)});
                break;
            case "clear":
                Shell.hist = [""];
                Shell.histIndex = 0;
                break;
            default:
                const echo = Shell.echo;

                echo("Usage: hist [COMMAND]");
                echo();
                echo('COMMAND: defaults to "list"');
                echo('\t"list": show history', true);
                echo('\t"clear": remove all history items', true);
                break;
        }
    }
]);

Commands.set("info", ["Get some info about the browser",
    () => {
        const echo = (e) => Shell.echo(e);
        const nav = navigator;

        echo(`language: ${nav.language}`);
        echo(`languages: ${nav.languages.join(", ")}`);
        echo(`multitouch: ${nav.maxTouchPoints > 1 ?"supported":"unsupported"}`);
        echo(`platform: ${nav.platform || "unknown"}`);
        echo(`productSub: ${nav.productSub=="20100101"?"firefox":"chrome/safari/other"}`);
        echo(`userAgent: ${nav.userAgent}`)
    }
]);

Commands.set("help", ["Show descriptions",
    (args) => {
        if (Commands.has(args[0])) {
            Shell.echo(Commands.get(args[0])[0]);
        } else {
            Commands.forEach((command, name) => {
                Shell.echo(`${name}\t-\t${command[0]}`, true);
            });
        }
    }
]);

export default Commands;