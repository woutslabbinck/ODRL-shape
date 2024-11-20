import { parse } from 'rdf-dereference-store';
import { write } from '@jeswr/pretty-turtle';
import fs from 'fs';
import { join} from 'path'

async function main() {
    const shaclcFile = join(__dirname, "odrl.shc");
    const shaclFile = join(__dirname,"odrl-shacl.ttl");

    const { store: shaclStore, prefixes } = await parse(fs.readFileSync(shaclcFile).toString(), { contentType: 'text/shaclc' });

    fs.writeFileSync(shaclFile, await write([...shaclStore], {prefixes}));
}
main()