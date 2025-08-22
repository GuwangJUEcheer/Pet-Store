// openapi.config.js
import {generateService} from '@umijs/openapi';

void generateService({
    requestLibPath: "import request from '../Request/request'",
    schemaPath: 'http://localhost:8080v2/api-docs',
    serversPath: './src',
});
