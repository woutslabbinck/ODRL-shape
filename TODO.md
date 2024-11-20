TODO: 
- [ ] clean up README
- [ ] create ODRL model
- [ ] first do cardinality, then odrl
  - [ ] if cardinality, throw error

Test repository to prototype a shacl validation file for ODRL policies

repository contains:
- [shacl-file for ODRL](./odrl-shacl.ttl)
- [shaclc-file for ODRL](./odrl.shc)
- [odrl-example](./odrl-example.ttl)
- code to do the evaluation:
  - shacl engine [index.ts](index-engine.ts) `npx ts-node shacl-engine.ts`
  - shacl validator [index.ts](index-validator.ts) `npx ts-node shacl-validator.ts`

Both versions currently are ESM -> use Dynamic import to resolve: https://stackoverflow.com/questions/58858782/using-the-dynamic-import-function-on-node-js and https://github.com/rdf-ext/shacl-engine/issues/36#issuecomment-2483812549

make RDFUtil usable
npm i n3 rdf-parse uuid rdf-store-stream streamify-string
npm i --save-dev @types/n3

Note: wanted to use shacl-engine, but that one does not have typescript support...
So I used rdf-validate-shacl
