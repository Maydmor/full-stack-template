docker run --network="host" --rm -v "../internal/v1:/local" openapitools/openapi-generator-cli generate -i http://host.docker.internal:8000/openapi.json -g typescript-axios -o /local/ --skip-validate-spec