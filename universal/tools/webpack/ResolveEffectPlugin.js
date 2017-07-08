import path from "path";

const pathToEffects = path.resolve(__dirname, "..", "..", "app", "effects");

export default class ResolveEffectPlugin {
    constructor(options) {
        if (options.target === undefined) {
            throw new Error("No target given");
        }
        this.options = options;
    }
    rewritePath([all, partial]) {
        if (partial === "index.js") {
            return all;
        }

        return path.resolve(pathToEffects, this.options.target, partial);
    }
    apply(compiler) {
        compiler.plugin("normal-module-factory", nmf => {
            nmf.plugin("after-resolve", (result, callback) => {
                const pathMatch = /app[/\\]effects[/\\]registry[/\\](.*)/.exec(result.resource);

                return callback(null, pathMatch === null ? result : this.rewritePath(pathMatch));
            });
        });
    }
}
