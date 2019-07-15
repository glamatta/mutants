# Mutant Detector

## :bulb: Contexto

Este es el proyecto solicitado en un [examen (detalle en el link)](/public/doc/examen.md), donde se pide crear unos servicios REST para detectar mutantes según DNA entregado y también poder ver estadísticas de los datos procesados. 

## :heavy_check_mark: Entrega

La aplicación entregada es una **App Engine** de [Google Cloud Plataform (GCP)](https://cloud.google.com/) desarrollada en Nodejs, conectada también con **Cloud Firestore** de GCP como base de datos. El repositorio se encuentra en [GitHub](https://github.com/glamatta/mutants).

## :electric_plug: Probar la aplicación

La aplicación expone documentación además de los servicios (ver en: [https://mutants1.appspot.com/](https://mutants1.appspot.com/)).
Existe un archivo de definición de la API en [OpenAPI v3.0.2](https://swagger.io/specification/) con el cual se puede iniciar una colección o proyecto de API en algún cliente de APIs como por ejemplo [Postman](https://www.getpostman.com/) o [Insomnia](https://insomnia.rest/): 

:page_facing_up: **[mutant.openAPI.json](/public/resources/mutant.openAPI.json)**

Ejemplo de la ejecución del post:
<p><a href="/public/resources/post-example.png" target="blank"> <img src="/public/resources/post-example.png" alt="POST en Postman" width="500"/></a></p>

El resultado estadístico se puede probar directamente en browser: [https://mutants1.appspot.com/stats](https://mutants1.appspot.com/stats)

## :computer: Instalar 

### Pre-requisitos
Instalar previamente:
- [nodejs](https://nodejs.org) con [npm](https://www.npmjs.com/get-npm)
- [git](https://git-scm.com/)
- _(Opcional)_ [SDK Google Cloud](https://cloud.google.com/sdk/) para comando `gcloud`

### Instalción de la aplicación

Estando en una consola o terminal en el directorio donde deseas instalar la aplicación, ejecutas:

```
git clone https://github.com/glamatta/mutants.git
```
Una vez descargado el proyecto entras al directorio donde se instaló la aplicación:

```
cd mutants
```

Instalar las dependencias con:

```
npm install
```

Luego de la instalación ya puedes ejecutar el servidor:

```
npm run start
```
:warning: _debes asegurarte no tener otro servicio utilizando el puerto 80 que es el que usará la aplicación por defecto_.

Si quieres ejecutar los test debes utilizar:

```
npm run test
```
Y para ejecutar los test y además las estadísticas de _Code Coverage_ (lo que actualizará también los HTMLs), ejecutar:

```
npm run coverage
```

Despliegue de la aplicación en GCP. Teniendo las configuraciones y accesos previamente configurados, se debe ejecutar:
```
gcloud app deploy
```

## :hammer: Análisis de DNA

### Requerimiento inicial
La funcionalidad se implementa basada en la [documentación entregada](/public/doc/examen.md) donde, en resumen, se debe analizar una matriz [ `n` x `n` ] de _strings_ que sólo contienen las letras `A`, `C`, `T` y `G`. Se debe construir un servicio REST que reciba esta información y responda si esa matriz de DNA corresponde a un mutante o no, respondiendo al POST con un **http status = 200** si es mutante y **http status = 403** si no es.
Es un mutante si se encuentran al menos 2 secuencias de 4 de las mismas letras consecutivas, secuencias que pueden estar horizontal, vertical u oblicuas, como lo muestran los ejemplos entregados:

<div class="row">
<div class="col-4 offset-1">

<h5>No Mutante</h5>
<table class="table table-bordered">
	<tr><td> A </td><td> T </td><td> G </td><td> C </td><td> G </td><td> A </td></tr>
	<tr><td> C </td><td> A </td><td> G </td><td> T </td><td> G </td><td> C </td></tr>
	<tr><td> T </td><td> T </td><td> A </td><td> T </td><td> T </td><td> T </td></tr>
	<tr><td> A </td><td> G </td><td> A </td><td> C </td><td> G </td><td> G </td></tr>
	<tr><td> G </td><td> C </td><td> G </td><td> T </td><td> C </td><td> A </td></tr>
	<tr><td> T </td><td> C </td><td> A </td><td> C </td><td> T </td><td> G </td></tr>
</table>

</div>
<div class="col-4 offset-1">

<h5>Mutante</h5>
<table class="table table-bordered mutant">
	<tr><td> A </td><td> T </td><td> G </td><td> C </td><td> G </td><td> A </td></tr>
	<tr><td> C </td><td> A </td><td> G </td><td> T </td><td> G </td><td> C </td></tr>
	<tr><td> T </td><td> T </td><td> A </td><td> T </td><td> G </td><td> T </td></tr>
	<tr><td> A </td><td> G </td><td> A </td><td> A </td><td> G </td><td> G </td></tr>
	<tr><td> C </td><td> C </td><td> C </td><td> C </td><td> T </td><td> A </td></tr>
	<tr><td> T </td><td> C </td><td> A </td><td> C </td><td> T </td><td> G </td></tr>
</table>

</div>
</div>

### Supuestos y Consideraciones

Para realizar la programación fue necesario considerar algunas definiciones que no se encontraban en la declaración inicial, la aplicación requiere:

- El objeto de entrada siempre será un `json` que contiene sólo una propiedad llamada `dna` (en minúsculas) y esta propiedad tiene como valor un arreglo de _strings_
- 4 ≤ `n` ≤ 1000
- Las _strings_ NO contienen otros caracteres más que `A`, `C`, `T` y `G` en mayúsculas.
- todas las _strings_ tendrán la misma cantidad de caracteres que la cantidad de _strings_ para que los datos siempre sean una matriz cuadrada de [ `n` x `n` ]

:warning: De no cumplirse alguna de esas condiciones la respuesta de la aplicación será **400: Bad Request**

En cuanto al análisis de los datos se definen los siguientes supuestos:

- un _match_ es una coincidencia de 4 letras consecutivas
- los _match_ pueden cruzarse si están en distintas direcciones, por ejemplo horizontal y vertical, aunque se crucen se consideran 2 _match_ distintos
- Los _match_ no se pueden cruzar en la misma dirección, es decir, una fila como `aaaaaaaa` tiene 2 _match_ solamente y una como `aaaaaa` tiene sólo 1 _match_

:bulb: Estas reglas son totalmente posibles de modificar, pero dado que no había especificación detallada al respecto, la aplicación actualmente considera estas definiciones.

## :bar_chart: Test y Code Coverage

Los test automatizados constan de 14 dna que pruebas casos de mutantes, no-mutantes y dna inválidos. Se encuentran en el directorio 'test/dna'.

Resultado de logs de test y code coverage se puede visualizar en el ejemplo [testandcoverage.log](/public/resources/testandcoverage.log)

Adicionalmente la aplicación publica también la generación del _Code Coverage_ en HTML en [https://mutants1.appspot.com/coverage/index.html](https://mutants1.appspot.com/coverage/index.html)

![coverage](/public/resources/coverage-example.png)

## :triangular_ruler: Diagramas

### Arquitectura

![ARCHITECTURE](/public/resources/arch.jpg)

### Secuencia

![API POST](/public/resources/api-post.jpg)

![API STATS](/public/resources/api-stats.jpg)
