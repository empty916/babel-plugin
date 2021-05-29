import { PluginObj, transformSync } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';


const sourceCode = `
import a from 'a';

const b = a;
const c = b;
function logA() {
    console.log(a);
}
`;

const plugin = declare((api) => {
    return {
        visitor: {
            Program(path, state) {
                // path.scope.rename('a', path.scope.generateUid());
                path.scope.getBinding('a')?.referencePaths.forEach(n => (n as any).isReferenceA = true);
            },
            Identifier(path, state) {
                // console.log('id: ', path.node.name, ' has binding a: ' , path.scope.hasReference('a'));
                console.log('id: ', path.node.name, ' has referenced a: ' , path.scope.hasReference('a'));
            },
            ImportDeclaration(path, state) {
                
            }
        },
    }
})


const res = transformSync(sourceCode, {
    plugins: [plugin],
});

console.log(res?.code);
