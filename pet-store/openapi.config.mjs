// openapi.config.js
import {generateService} from '@umijs/openapi';

void generateService({
    requestLibPath: "import request from '../Request/request'",
    schemaPath: 'http://localhost:8080/api/v2/api-docs',
    serversPath: './src',
});
