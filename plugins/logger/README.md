# Wiz Logger Plugin

> A plugin for logging your Wiz requests with ease.

## Usage

Just import the `Logger` class and add it to your `Wiz` instance's plugins like in the following example:

```ts
import { Wiz } from "https://deno.land/x/wiz/mod.ts";
import { Logger } from "https://deno.land/x/wiz_logger/mod.ts";

const logger = new Logger();

const wiz = new Wiz([logger]);
```

## Behavior

// TODO

## License

Wiz is licensed under the MIT License. See the [license](/LICENSE) for more info.
