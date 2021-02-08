/*
 * @Author: caizeyong
 * @Date: 2021-02-08 14:49:26
 * @Description: 
 */
!(function(){
  'use strict';

  angular.module('frontend.lang', [])

  angular.module('frontend.lang')
    .constant('lang', {
        __default_lang__: window.localStorage.getItem('lang') || 'en',
        en: {
          Header: {
            Profile: 'Profile',
            Users: 'Users',
            Settings: 'Settings',
            Logout: 'Logout'
          },
          Menu: {
            Dashboard: 'Dashboard',
            Routes: 'Routes',
            Services: 'Services',
            APIs: 'APIs',
            Consumers: 'Consumers',
            Plugins: 'Plugins',
            Upstreams: 'Upstreams',
            Certificates: 'Certificates',
            APIGateway: 'API Gateway',
            Info: 'Info',
            Application: 'Application',
            Users: 'Users',
            Connections: 'Connections',
            Snapshots: 'Snapshots',
            Settings: 'Settings'
          },
          Dashboard: {
            CONNECTIONS: 'CONNECTIONS',
            TotalRequests: 'Total Requests',
            DATABASE: 'DATABASE',
            NODEINFO: 'NODE INFO',
            TIMERS: 'TIMERS',
            DATASTOREINFO: 'DATASTORE INFO',
            PLUGINS: 'PLUGINS'
          },
          Info: {
            title: 'Node Info',
            desc: 'Generic details about the node'
          },
          Service: {
            title: 'Services',
            desc: 'Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc.'
          },
          Route: {
            title: 'Routes',
            desc: 'The Route entities defines rules to match client requests. Each Route is associated with a Service, and a Service may have multiple Routes associated to it. Every request matching a given Route will be proxied to its associated Service.'
          },
          Consumer: {
            title: 'Consumers',
            desc: 'The Consumer object represents a consumer - or a user - of an API. You can either rely on Kong as the primary datastore, or you can map the consumer list with your database to keep consistency between Kong and your existing primary datastore.'
          },
          Plugin: {
            title: 'Plugins',
            desc: 'A Plugin entity represents a plugin configuration that will be executed during the HTTP request/response workflow, and it\'s how you can add functionalities to APIs that run behind Kong, like Authentication or Rate Limiting for example.'
          },
          Upstreams: {
            title: 'Upstreams',
            desc: 'The upstream object represents a virtual hostname and can be used to loadbalance incoming requests over multiple services (targets). So for example an upstream named <code>service.v1.xyz</code> with an API object created with an <code>upstream_url=https://service.v1.xyz/some/path</code>. Requests for this API would be proxied to the targets defined within the upstream.'
          },
          Certificate: {
            title: 'Certificates',
            desc: 'A certificate object represents a public certificate/private key pair for an SSL certificate. These objects are used by Kong to handle SSL/TLS termination for encrypted requests. Certificates are optionally associated with SNI objects to tie a cert/key pair to one or more hostnames.'
          },
          User: {
            title: 'Users',
            desc: 'Manage Konga users and user roles'
          },
          Connection: {
            title: 'Connections',
            desc: 'Create connections to Kong Nodes and activate the one you want use.'
          },
          Snapshot: {
            title: 'Snapshots',
            desc: "Take snapshots of currently active nodes." +
                  "<br>All <code>Services</code>, <code>Routes</code>, <code>APIs</code>, " +
                  "<code>Plugins</code>, <code>Consumers</code>, <code>Upstreams</code> and <code>Targets</code>will be saved and available for later import.",
          },
          Setting: {
            title: 'Settings',
            desc: 'settings'
          }
        },
        cn: {
          Header: {
            Profile: '个人信息',
            Users: '用户管理',
            Settings: '系统设置',
            Logout: '退出'
          },
          Menu: {
            Dashboard: '统计面板',
            Routes: '路由',
            Services: '服务',
            APIs: 'API',
            Consumers: '消费者',
            Plugins: '插件',
            Upstreams: 'Upstreams',
            Certificates: '证书',
            APIGateway: 'API 网关',
            Info: '信息',
            Application: '应用',
            Users: '用户管理',
            Connections: '连接管理',
            Snapshots: '快照',
            Settings: '系统设置'
          },
          Dashboard: {
            CONNECTIONS: '连接',
            TotalRequests: '总请求',
            DATABASE: '数据库',
            NODEINFO: '节点信息',
            TIMERS: '定时器',
            DATASTOREINFO: '数据源信息',
            PLUGINS: '插件'
          },
          Info: {
            title: '节点信息',
            desc: '节点详情'
          },
          Service: {
            title: '服务',
            desc: '正如名称所示的那样，服务实体是您自己的每个上游服务的抽象。服务的示例包括数据转换微服务、计费 API 等。'
          },
          Route: {
            title: '路由',
            desc: '路由实体定义规则以匹配客户端请求。每个路由都与服务相关联，并且一个服务可能具有与其关联的多个路由。匹配给定路线的每个请求都将被代理到其关联的服务。'
          },
          Consumer: {
            title: '消费者',
            desc: '消费者对象表示API的消费者或用户。您可以依靠Kong作为主要数据存储，也可以将使用者列表与数据库映射，以保持Kong和现有主要数据存储之间的一致性。'
          },
          Plugin: {
            title: '插件',
            desc: '插件实体表示将在HTTP请求/响应工作流期间执行的插件配置，这是您可以向在Kong后面运行的API添加功能的方式，例如身份验证或速率限制。'
          },
          Upstreams: {
            title: 'Upstreams',
            desc: '上游对象代表虚拟主机名，可用于对多个服务（目标）上的传入请求进行负载平衡。因此，例如，一个名为<code>service.v1.xyz</code>的上游，其API对象是用<code>ustreaming_url = https：//service.v1.xyz/some/path</code>创建的。对该API的请求将被代理到上游定义的目标'
          },
          Certificate: {
            title: 'Certificates',
            desc: '证书对象代表SSL证书的公共证书/私钥对。 这些对象被Kong用于处理加密请求的SSL / TLS。证书可以选择与SNI对象关联，以将证书/密钥对绑定到一个或多个主机名。'
          },
          User: {
            title: '用户',
            desc: 'konga 用户角色管理'
          },
          Connection: {
            title: 'Connections',
            desc: '创建与Kong 节点的连接并激活您要使用的连接。'
          },
          Snapshot: {
            title: '快照',
            desc: "拍摄当前激活节点的快照" +
                  "<br>所有 <code>Services</code>, <code>Routes</code>, <code>APIs</code>, " +
                  "<code>Plugins</code>, <code>Consumers</code>, <code>Upstreams</code> 以及 <code>Targets</code> 将会被保存并可用于之后导入。",
          },
          Setting: {
            title: '系统设置',
            desc: '设置'
          }
        }
      }
    )
})();