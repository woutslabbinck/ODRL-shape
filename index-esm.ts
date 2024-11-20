import fs from 'fs';
import { join } from 'path';
import { parse } from 'rdf-dereference-store';
import SHACLValidator from 'rdf-validate-shacl';
import rdfDataModel from '@rdfjs/data-model';
import { Store } from "n3";
// @ts-ignore
import { Validator } from 'shacl-engine';

async function rdfValidateShaclValidation() {
    const shaclFile = join(".", "odrl-shacl.ttl");
    const odrlExamplelFile = join(".", "odrl-example.ttl");
    const odrlVoc = join(".", 'odrl.ttl')

    const { store: shaclStore } = await parse(fs.readFileSync(shaclFile).toString(), { contentType: 'text/turtle' });
    const { store: odrlPolicy } = await parse(fs.readFileSync(odrlExamplelFile).toString(), { contentType: 'text/turtle' });
    // attempt to get the rdfsubclass as defined by shacl -> no shacl engine support for advanced features
    const { store: odrl } = await parse(fs.readFileSync(odrlVoc).toString(), { contentType: 'text/turtle' });
    const store = new Store([...odrl, ...odrlPolicy])
    const validator = new SHACLValidator(shaclStore)

    const report = validator.validate(store)

    console.log(`Conformity with rdf-validate-shacl (shaclc): ${report.conforms}`);

}
rdfValidateShaclValidation()


async function shaclEngineValidationShaclC() {
    const shaclFile = join(".", "odrl.shc");
    const odrlExamplelFile = join(".", "odrl-example.ttl");
    const odrlVoc = join(".", 'odrl.ttl')

    const { store: shaclStore, prefixes } = await parse(fs.readFileSync(shaclFile).toString(), { contentType: 'text/shaclc' });
    const { store: odrlPolicy } = await parse(fs.readFileSync(odrlExamplelFile).toString(), { contentType: 'text/turtle' });
    // attempt to get the rdfsubclass as defined by shacl -> no shacl engine support for advanced features
    const { store: odrl } = await parse(fs.readFileSync(odrlVoc).toString(), { contentType: 'text/turtle' });
    const store = new Store([...odrl, ...odrlPolicy])

    // @ts-ignore
    const validator = new Validator(shaclStore, { factory: rdfDataModel })
    // @ts-ignore
    const report = await validator.validate({ dataset: store })

    console.log(`Conformity with shacl-engine (shaclc): ${report.conforms}`);
}
shaclEngineValidationShaclC()