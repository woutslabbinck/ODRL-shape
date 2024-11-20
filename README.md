# ODRL Shape repository

## Context

This repository contains a [SHACL](https://www.w3.org/TR/shacl/) shape for the [ODRL](https://www.w3.org/TR/odrl-model/) Information Model 2.2 .
Code snippets are provided for Typescript to evaluate the ODRL Policies and verify they conform to the shape. 

For more information about RDF shapes, checkout the [awesome shapes](https://github.com/w3c-cg/awesome-semantic-shapes) repository.


Notes:
- there is no cardinality check being performed on the amount of policies. Thus if no ODRL policies of the class `odrl:Policy` ,`odrl:Set`, `odrl:Agreement` or `odrl:Offer` are provided, the conformance state will be true.
  - no disambiguation on the number of assignee/assigner based on the type of policy is being performed as this is a tedious task with SHACL.
- the SHACL shapes were written in [SHACL Compact Syntax](https://w3c.github.io/shacl/shacl-compact-syntax/) (SHACLC)

## Code

Dynamic imports are being used such that the [Validator (shacl-engine)](https://github.com/rdf-ext/shacl-engine/) and [SHACLvalidator (rdf-validate-shacl)](https://github.com/zazuko/rdf-validate-shacl) can be used in a non ESM setting, recommended by [bergos](https://github.com/bergos) in following [issue](https://github.com/rdf-ext/shacl-engine/issues/36).

files:
- [odrl.shc](./odrl.shc): The SHACLC file containing the ODRL shape
- [odrl-shacl.ttl](./odrl-shacl.ttl): The ODRL SHACL shape file in the turtle format
- [odrl.ttl](./odrl.ttl): The ODRL Vocabulary, required as input to know that e.g. `odrl:read` is an Action. Downloaded on 20/11/2024 from https://www.w3.org/ns/odrl/2/ODRL21.ttl
- [odrl-example.ttl](./odrl-example.ttl): Three ODRL Policies that conform to the shacl shape

scripts:
- [create-shacl.ts](./create-shacl.ts): Script that creates the SHACL shape from SHACLC  (`odrl.sch` -> `odrl-shacl.ttl`)
  - `npx ts-node create-shacl.ts`
- [index.ts](./index.ts): Scrip that validates the ODRL policies using the ODRL SHACL shape using [rdf-validate-shacl](https://github.com/zazuko/rdf-validate-shacl) and [shacl-engine](https://github.com/rdf-ext/shacl-engine)
  - `npx ts-node index.ts`

## Feedback and questions

Do not hesitate to [report a bug](https://github.com/woutslabbinck/UCR-test-suite/issues).

Further questions can also be asked to [Wout Slabbinck](mailto:wout.slabbinck@ugent.be) (developer and maintainer of this repository).
