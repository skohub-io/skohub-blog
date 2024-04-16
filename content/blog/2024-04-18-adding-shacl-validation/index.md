---
title: How to add automatic SHACL validation to your vocabs
date: "2024-04-18"
authors: [{lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"},
           {lastname: "Pohl",
           firstname: "Adrian",
           id: "https://lobid.org/team/ap#"}]
---

## How to add automatic SHACL validation to your vocabs

To ensure the quality of your vocabularies, you might want to add some automatic validation, just like one is able to run automatic software tests before a merge request.
With the SHACL shapes developed in our [shapes repository](https://github.com/skohub-io/shapes) this is no easily possible.

All you have to do is adding the [following GitHub Action](https://github.com/skohub-io/shapes/?tab=readme-ov-file#add-validation-in-a-vocabulary-repository) to your vocabularies.
Add a `.github/workflows/main.yaml` file:

```yaml
name: Validate TTL Files

on: [push]

jobs:
  check-for-warnings:
    name: Check for Warnings
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Check for Warnings
      run: |
        curl -s https://raw.githubusercontent.com/skohub-io/shapes/main/scripts/checkForWarning.rq >> checkForWarning.rq
        find . -type f -name '*.ttl' | while read file; do
          # Adjust the file path to remove the './' part
          adjusted_file_path=$(echo "$file" | sed 's|^./||')
          echo "Processing $adjusted_file_path with Docker..."
          docker run --rm -v "$(pwd)/$adjusted_file_path:/rdf/test.ttl" skohub/jena:4.6.1 shacl validate --shapes https://raw.githubusercontent.com/skohub-io/shapes/main/skohub.shacl.ttl --data /rdf/test.ttl >> result.ttl
          validation_result="$(docker run --rm --mount type=bind,source=./checkForWarning.rq,target=/rdf/checkForViolation.rq --mount type=bind,source=./result.ttl,target=/rdf/result.ttl skohub/jena:4.6.1 arq --data /rdf/result.ttl --query /rdf/checkForViolation.rq)"
          echo $validation_result
          lines=$(echo "$validation_result" | wc -l )
          # Correct validation has 4 lines of output
          [[ ${lines} -eq 4 ]] || exit 1
        done

  check-for-errors:
    name: Check for Errors
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Check for Errors
      run: |
        curl -s https://raw.githubusercontent.com/skohub-io/shapes/main/scripts/checkForViolation.rq >> checkForViolation.rq
        find . -type f -name '*.ttl' | while read file; do
          # Adjust the file path to remove the './' part
          adjusted_file_path=$(echo "$file" | sed 's|^./||')
          echo "Processing $adjusted_file_path with Docker..."
          docker run --rm -v "$(pwd)/$adjusted_file_path:/rdf/test.ttl" skohub/jena:4.6.1 shacl validate --shapes https://raw.githubusercontent.com/skohub-io/shapes/main/skohub.shacl.ttl --data /rdf/test.ttl >> result.ttl
          validation_result="$(docker run --rm --mount type=bind,source=./checkForViolation.rq,target=/rdf/checkForViolation.rq --mount type=bind,source=./result.ttl,target=/rdf/result.ttl skohub/jena:4.6.1 arq --data /rdf/result.ttl --query /rdf/checkForViolation.rq)"
          echo $validation_result
          lines=$(echo "$validation_result" | wc -l )
          # Correct validation has 4 lines of output
          [[ ${lines} -eq 4 ]] || exit 1
        done
```

This will activate checks for violations and warnings of the [SkoHub SHACL Shape](https://github.com/skohub-io/shapes/blob/main/skohub.shacl.ttl).
These checks will also automatically run before each merge request.
Unfortunatley you will also get a *red* error message for warnings, e.g. if you have no license provided in your vocabulary.
This is due to the fact that Actions either complete or fail and we have no way to indicate a "warning" message.


## What about other code repositories?

The mentioned approach should be applicable to every code repository supporting CI pipelines.
The check might have to be adjusted a bit, but the main part should be easy to copy.
If you have a requirement for a specific code repository and  need support or have developed something you want to share, feel free to reach out at the [metadaten.community](https://metadaten.community/c/software-und-tools/skohub/9) forum or open an [issue](https://github.com/skohub-io/shapes/issues).

