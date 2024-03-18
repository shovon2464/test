// import swaggerDataBase from './swaggerDataBase.tsx'

// const token = Store.getState().getIn(['user', 'token'])
// let Authorization = 'Bearer ' + token

import swaggerDataBase from "./swaggerDataBase";



let role = {
    //erp connection
    "http://ca.uwinsure.com:4000/graphql": {
        "post": {
            "tags": ["ERP and CRM Connection"],
            "summary": "Check the customer information in CRM system",
            "description": "角色管理--添加角色2",
            "operationId": "add_role",
            "consumes": ["application/json", "application/xml"],
            "produces": ["application/xml", "application/json"],
            "parameters": [{
                "name": "Authorization",
                "in": "header",
                "description": "Authorization",
                "required": false,
                "type": "string",
                // value: Authorization,
                "collectionFormat": "1"
            },
                {
                    "in": "body",
                    "name": "body",
                    "description": "角色管理--添加角色",
                    "required": true,
                    "schema": {
                        type: "object",
                        properties: {
                            role_name: {
                                type: "string",
                                "example": 'role1',
                                description: '角色名称'
                            },
                            is_superuser: {
                                type: "integer",
                                "example": 0,
                                description: '-1:访客 0:普通用户 1:系统管理员'
                            },
                        }
                    },

                },
                {
                    "in": "body",
                    "name": "body",
                    "description": "角色管理--添加角色",
                    "required": true,
                    "schema": {
                        type: "object",
                        properties: {
                            role_name: {
                                type: "string",
                                "example": 'role1',
                                description: '角色名称'
                            },
                            is_superuser: {
                                type: "integer",
                                "example": 0,
                                description: '-1:访客 0:普通用户 1:系统管理员'
                            },
                        }
                    },

                }
            ],
            "responses": {
                "405": {
                    "description": "Invalid input"
                }
            },
            "security": [{
                "petstore_auth": ["write:pets", "read:pets"]
            }]
        },
    },
}


swaggerDataBase.paths = {
    ...swaggerDataBase.paths,
    ...role,
}

export default swaggerDataBase
