
(function() {
    'use strict';

    angular.module('frontend.users', [
        'frontend.lang'
    ]);

    // Module configuration
    angular.module('frontend.users')
        .config([
            '$stateProvider',
            'lang',
            function config($stateProvider, lang) {
                $stateProvider
                    .state('users', {
                        url: '/users',
                        parent : 'frontend',
                        cache : false,
                        data : {
                            pageName : lang[lang.__default_lang__].User.title,
                            //displayName : "konga users",
                            pageDescription : lang[lang.__default_lang__].User.desc
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/users/index.html',
                                controller: 'UsersController',
                                resolve: {
                                    _items: [
                                        'ListConfig',
                                        'UserModel',
                                        function resolve(
                                            ListConfig,
                                            UserModel
                                        ) {
                                            var config = ListConfig.getConfig();

                                            var parameters = {
                                                // populate: 'node',
                                                limit: config.itemsPerPage,
                                                sort: 'createdAt DESC'
                                            };

                                            return UserModel.load(parameters);
                                        }
                                    ],
                                    _count: [
                                        'UserModel',
                                        function resolve(UserModel) {
                                            return UserModel.count();
                                        }
                                    ]
                                }
                            }
                        }
                    })
                    .state('users.create', {
                        url: '/create',
                        data : {
                            pageName : "Create User",
                            displayName : "create",
                            pageDescription : null
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/users/user-create.html',
                                controller: 'UserCreateController'
                            }
                        }
                    })
                    .state('users.show', {
                        url: '/:id',
                        data : {
                            pageName : "User profile",
                            displayName : "profile",
                            pageDescription : null
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/users/user.html',
                                controller: 'UserController',
                                resolve: {
                                    _user: [
                                        '$stateParams',
                                        'UserModel',
                                        function resolve(
                                            $stateParams,
                                            UserModel
                                        ) {
                                            return UserModel.fetch($stateParams.id);
                                        }
                                    ],
                                }
                            }
                        }
                    })
            }
        ])
    ;
}());
