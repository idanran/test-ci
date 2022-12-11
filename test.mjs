import { env } from 'node:process'

function code(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
    };
}

function run(str, code) {
    return `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
}

function rgb24(str, color) {
    if (typeof color === "number") {
        return run(
            str,
            code(
                [38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff],
                39,
            ),
        );
    }
    return run(
        str,
        code(
            [
                38,
                2,
                clampAndTruncate(color.r),
                clampAndTruncate(color.g),
                clampAndTruncate(color.b),
            ],
            39,
        ),
    );
}

console.log(rgb24('this is a message', 0x6C7753))

console.log(env)

//
