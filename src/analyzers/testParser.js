import parser from './sintactico';

try {
    const code = `var x : int`;
    const tree = parser.parse(code);
    console.log('Parse result:', tree);
} catch (error) {
    console.error('Parse error:', error.message);
}
