import path from "path";

const pathToEffects = path.resolve(__dirname, "..", "..", "app", "effects");

class ResolverPlugin {
    constructor(options) {
        this.options = options;
    }
    rewritePath([all, effectName]) {
        return path.resolve(pathToEffects, effectName, effectName + "." + this.options.target);
    }
    apply(resolver) {
        resolver.plugin("described-resolve", (request, callback) => {
            const requestPath = request.request;
            const pathMatch = /[/\\]effects[/\\]([^/\\]+)$/.exec(requestPath);

            if (pathMatch === null) {
                callback();

                return;
            }

            resolver.doResolve(
                "resolve",
                Object.assign({}, request, {
                    request: this.rewritePath(pathMatch),
                }),
                "resolved effect",
                callback
            );
        });
    }
}

export default class ResolveEffectPlugin {
    constructor(options) {
        if (options.target === undefined) {
            throw new Error("No target given");
        }
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin("after-resolvers", () => {
            compiler.resolvers.normal.apply(new ResolverPlugin(this.options));
        });
    }
}
