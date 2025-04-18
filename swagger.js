const swaggerDocument = {
    openapi: '3.0.0', // 👈 این خط خیلی مهمه!
    info: {
        title: 'management project',
        version: '1.0.0',
        description: 'ali bahrampoor',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // اختیاری
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    servers: [
        {
            url: 'http://localhost:5000',
        },
    ],
    tags: [
        {
            name: 'default',
            description: 'متد های آزاد',
        },
        {
            name: 'users',
            description: 'همه چی درباره کاربران',
        },
        {
            name: 'profile',
            description: ' کاربر',
        },
        {
            name: 'Products',
            description: 'مدیریت و نمایش محصولات',
        },
    ],
    paths: {
        '/': {
            get: {
                tags: ['default'],
                summary: 'برگردوندن سلام',
                responses: {
                    200: {
                        description: 'همه چی اوکیه',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {type: 'string'},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/auth/login': {
            post: {
                tags: ['users'],
                summary: 'ورود کاربر',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: {
                                        type: 'string',
                                        example: 'ali123',
                                    },
                                    password: {
                                        type: 'string',
                                        example: '123456',
                                    },
                                },
                                required: ['username', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'ورود موفق',
                    },
                    401: {
                        description: 'اطلاعات ورود اشتباه است',
                    },
                },
            },
        },
        '/auth/register': {
            post: {
                tags: ['users'],
                summary: 'ثبت نام کاربر',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: {
                                        type: 'string',
                                        example: 'ali.bahrampoor',
                                    },
                                    email: {
                                        type: 'string',
                                        example: 'a@gmail.com',
                                    },
                                    mobile: {
                                        type: 'string',
                                        example: '09133333333',
                                    },
                                    password: {
                                        type: 'string',
                                        example: '123456',
                                    },
                                    confirmPassword: {
                                        type: 'string',
                                        example: '123456',
                                    },

                                },
                                required: ['username', 'password', "email", "mobile", "password", "confirmPassword"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'ورود موفق',
                    },
                    401: {
                        description: 'اطلاعات ورود اشتباه است',
                    },
                },
            },
        },
        '/user/profile': {
            get: {
                tags: ['profile'],
                summary: 'نمایش اطلاعات کاربر',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: 'اطلاعات کاربر',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: {type: 'string'},
                                        email: {type: 'string'},
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'توکن ارسال نشده یا نامعتبره',
                    },
                },
            },
        },

    },
};

module.exports = swaggerDocument;