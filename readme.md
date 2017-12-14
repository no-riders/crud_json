<h1>Tabular data management NodeJS via local JSON file</h1>

<h3>Usage</h3>
<p>To install on local machine, NodeJS is required.</p>
<p>From `crud_json` folder in Terminal:</p>
<ul>
    <li>`npm install` to install dependencies</li>
    <li>`npm start` to start local server at `localhost:3000`</li>
    <li>go to `localhost:3000` in your browser</li>
</ul>

<h3>Features</h3>
<ul>
    <li>Create entry: `id` field required, rest is optional</li>
    <li>Update entry: `id` of the item to be updated is required. Can update `id`, `name`, `price`</li>
    <li>Delete entry: delete by `id`</li>
    <li>Table is sorted by `id` as a default. Can also be sorted by `name`, `price` by pressing column header</li>
    <li>Error handling: unable to created duplicate entries, update `id` to existing one, delete non existing id</li>
</ul>
