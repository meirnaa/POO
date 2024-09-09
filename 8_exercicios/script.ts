import { AppBanco } from "./app";

let appBanco: AppBanco = new AppBanco();
appBanco.carregarDeArquivo();
appBanco.menu();
appBanco.salvarEmArquivo();

