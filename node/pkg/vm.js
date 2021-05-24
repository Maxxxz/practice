const vm = require('vm');
const heapdump = require('heapdump');

const total = 5000;

const writeSnapshot = (count) => {
    heapdump.writeSnapshot(`./${count}-${total}.heapsnapshot`);
};

const code = `
    const nativeError = console.error;

    if (!nativeError.hasBeenRewrite) {
        console.error = (...argv) => {
            nativeError(argv);
        };
        console.error.hasBeenRewrite = true;
    }
`;

const script = new vm.Script(code);

for (let i = 1; i <= total; i++) {
    script.runInNewContext({
        console,
    });

    console.log(`${i}/${total}`);

    switch (i) {
        case 1:
        case Math.floor(total * 0.5):
        case total:
            writeSnapshot(i);
    }
}

setTimeout(() => {
    writeSnapshot(total + 1);
}, 3000);

