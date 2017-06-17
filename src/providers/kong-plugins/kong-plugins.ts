import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../api';
import 'rxjs/add/operator/map';

/*
  Generated class for the KongPluginsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KongPluginsProvider {

  url  : string = 'kong/plugins';
  name : string = 'Plugins';

  constructor(public http: Http, public api: Api) {
    console.log('Hello KongPluginsProvider Provider');
  }


  listEnabled() {
    return this.api.get(this.url + "/enabled");
  }


  retrieveSchema(name : string) {
    return this.api.get(this.url + "/schema/" + name);
  }

  groups() {
    return [
      {
        name: "Authentication",
        description: "Protect your services with an authentication layer",
        icon: "mdi-account-outline",
        plugins: {
          "basic-auth": {
            description: "Add Basic Authentication to your APIs"
          },
          "key-auth": {
            description: "Add a key authentication to your APIs"
          },
          "oauth2": {
            description: "Add an OAuth 2.0 authentication to your APIs"
          },
          "hmac-auth": {
            description: "Add HMAC Authentication to your APIs"
          },
          "jwt": {
            description: "Verify and authenticate JSON Web Tokens"
          },
          "ldap-auth": {
            description: "Integrate Kong with a LDAP server"
          },
        }
      },
      {
        name: "Security",
        icon: "mdi-security",
        description: "Protect your services with additional security layers",
        plugins: {
          "acl": {
            description: "Control which consumers can access APIs"
          },
          "cors": {
            description: "Allow developers to make requests from the browser"
          },
          "ssl": {
            description: "Add an SSL certificate for an underlying service"
          },
          "ip-restriction": {
            description: "Whitelist or blacklist IPs that can make requests"
          },
          "bot-detection": {
            description: "Detects and blocks bots or custom clients"
          }
        }
      },
      {
        name: "Traffic Control",
        icon: "mdi-traffic-light",
        description: "Manage, throttle and restrict inbound and outbound API traffic",
        plugins: {
          "rate-limiting": {
            description: "Rate-limit how many HTTP requests a developer can make"
          },
          "response-ratelimiting": {
            description: "Rate-Limiting based on a custom response header value"
          },
          "request-size-limiting": {
            description: "Block requests with bodies greater than a specific size"
          },
          "request-termination": {
            description: "This plugin terminates incoming requests with a specified status code and message. This allows to (temporarily) block an API or Consumer."
          },
        }
      },
      {
        name: "Serverless",
        description: "Invoke serverless functions in combination with other plugins:",
        icon: "mdi-cloud-sync",
        plugins: {
          "aws-lambda": {
            description: "Invoke an AWS Lambda function from Kong. It can be used in combination with other request plugins to secure, manage or extend the function."
          }
        }
      },
      {
        name: "Analytics & Monitoring",
        icon: "mdi-chart-bar",
        description: "Visualize, inspect and monitor APIs and microservices traffic",
        plugins: {
          "galileo": {
            description: "Business Intelligence Platform for APIs"
          },
          "datadog": {
            description: "Visualize API metrics on Datadog"
          },
          "runscope": {
            description: "API Performance Testing and Monitoring"
          },

        }
      },
      {
        name: "Transformations",
        icon: "mdi-nfc-tap",
        description: "Transform request and responses on the fly on Kong",
        plugins: {
          "request-transformer": {
            description: "Modify the request before hitting the upstream server"
          },
          "response-transformer": {
            description: "Modify the upstream response before returning it to the client"
          },
          "correlation-id": {
            description: "Correlate requests and responses using a unique ID"
          },
        }
      },
      {
        name: "Logging",
        icon: "mdi-content-paste",
        description: "Log requests and response data using the best transport for your infrastructure",
        plugins: {
          "tcp-log": {
            description: "Send request and response logs to a TCP server"
          },
          "udp-log": {
            description: "Send request and response logs to an UDP server"
          },
          "http-log": {
            description: "Send request and response logs to an HTTP server"
          },
          "file-log": {
            description: "Append request and response data to a log file on disk"
          },
          "syslog": {
            description: "Send request and response logs to Syslog"
          },
          "statsd": {
            description: "Send request and response logs to StatsD"
          },
          "loggly": {
            description: "Send request and response logs to Loggly"
          },

        }
      },
      {
        name: "Custom",
        description: "Custom Plugins",
        icon: "mdi-account-box-outline",
        plugins: {}
      }
    ]
  }



}
