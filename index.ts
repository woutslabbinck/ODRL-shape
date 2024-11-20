import { join} from 'path'
import fs from 'fs';
import { parse } from 'rdf-dereference-store';
import { write } from '@jeswr/pretty-turtle';
import { DataFactory } from 'rdf-data-factory';
import { Store } from 'n3'


const shaclcFile = join(__dirname, "odrl.shc");
const shaclFile = join(__dirname, "odrl-shacl.ttl");
const odrlExampleFile = join(__dirname, "odrl-example.ttl");
const odrlVoc = join(__dirname, 'odrl.ttl')


async function shaclEngineValidationShaclC() {
    //@ts-ignore
    const { Validator} = await import('shacl-engine') 

    const { store: shaclStore, prefixes } = await parse(fs.readFileSync(shaclcFile).toString(), { contentType: 'text/shaclc' });
    const { store: odrlPolicy } = await parse(fs.readFileSync(odrlExampleFile).toString(), { contentType: 'text/turtle' });

    // attempt to get the rdfsubclass as defined by shacl -> no shacl engine support for advanced features
    const { store: odrl } = await parse(fs.readFileSync(odrlVoc).toString(), { contentType: 'text/turtle' });
    const store = new Store([...odrl, ...odrlPolicy])

    // console.log(await write([...shaclStore], {prefixes}))
    // console.log(await write([...odrlPolicy], {prefixes}));

    // @ts-ignore
    const validator = new Validator(shaclStore, {factory: new DataFactory()})
    // @ts-ignore
    const report = await validator.validate({dataset: store})

    console.log(`Conformity with shacl-engine (shaclc): ${report.conforms}`);
    // Note that it also conforms if there is no ODRL policy at all    
}

async function shaclEngineValidation() {
    // @ts-ignore
    const { Validator} = await import('shacl-engine') //note: it does work 

    const { store: shaclStore } = await parse(fs.readFileSync(shaclFile).toString(), { contentType: 'text/turtle' });
    const { store: odrlPolicy } = await parse(fs.readFileSync(odrlExampleFile).toString(), { contentType: 'text/turtle' });

    // attempt to get the rdfsubclass as defined by shacl -> no shacl engine support for advanced features
    const { store: odrl } = await parse(fs.readFileSync(odrlVoc).toString(), { contentType: 'text/turtle' });
    const store = new Store([...odrl, ...odrlPolicy])

    // @ts-ignore
    const validator = new Validator(shaclStore, {factory: new DataFactory()})
    // @ts-ignore
    const report = await validator.validate({dataset: store})

    console.log(`Conformity with shacl-engine (normal SHACL): ${report.conforms}`);
    // Note that it also conforms if there is no ODRL policy at all    
}

async function rdfValidateShaclValidationShaclC(){
    const SHACLValidator = (await import('rdf-validate-shacl')).default

    const { store: shaclStore } = await parse(fs.readFileSync(shaclcFile).toString(), { contentType: 'text/shaclc' });
    const { store: odrlPolicy } = await parse(fs.readFileSync(odrlExampleFile).toString(), { contentType: 'text/turtle' });

    // attempt to get the rdfsubclass as defined by shacl -> no shacl engine support for advanced features
    const { store: odrl } = await parse(fs.readFileSync(odrlVoc).toString(), { contentType: 'text/turtle' });
    const store = new Store([...odrl, ...odrlPolicy])

    const validator = new SHACLValidator(shaclStore)
    
    const report = validator.validate(store)

    console.log(`Conformity with rdf-validate-shacl (shaclc): ${report.conforms}`);
}

shaclEngineValidationShaclC();
shaclEngineValidation();
rdfValidateShaclValidationShaclC();