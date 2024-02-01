# eslint-plugin-venkata

To Parse the &lt;this.Component /&gt; and replace with {this.Component()}

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-venkata`:

```sh
npm install eslint-plugin-venkata --save-dev
```

## Usage

Add `venkata` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "venkata"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "venkata/rule-name": 2
    }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


