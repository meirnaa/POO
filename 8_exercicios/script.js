"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var appBanco = new app_1.AppBanco();
appBanco.carregarDeArquivo();
appBanco.menu();
appBanco.salvarEmArquivo();
