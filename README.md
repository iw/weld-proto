Weld exemplar
====

This project (Boot Welder) is a discovery of the [Weld](https://github.com/hij1nx/weld) Node template module. Its unobtrusive nature has greater appeal than the directive-driven alternatives.

Boot Welder also includes [Bootstrap](https://github.com/twitter/bootstrap) for providing sweet layout.

Building Node
-------------

Following http://blog.nodejs.org/2011/04/04/development-environment/:

    $ curl -O http://nodejs.org/dist/node-v0.4.11.tar.gz
    $ tar -xvf node-v0.4.11.tar.gz 
    $ cd node-v0.4.11
    $ ./configure --prefix=$HOME/local/node-0.4.11 && make install


Install npm
-----------

    curl http://npmjs.org/install.sh | sh


Install dependencies
--------------------

The following dependencies are currently required:

* [jsdom](https://github.com/tmpvar/jsdom)
* [weld](https://github.com/hij1nx/weld)
* [connect](https://github.com/senchalabs/Connect)
* [escort](https://github.com/ckknight/escort)
* [uri](https://github.com/garycourt/uri-js)
* [node_redis](https://github.com/mranney/node_redis/)

Install:

    $ npm install jsdom
    $ npm install weld
    $ npm install connect
    $ npm install escort
    $ npm install https://github.com/garycourt/uri-js/tarball/master
    $ npm install hiredis redis

Performing `npm ls` currently provides:

```
├─┬ connect@1.7.0 
│ ├── mime@1.2.3 
│ └── qs@0.3.1 
├── escort@0.0.13 
├── hiredis@0.1.12 
├─┬ jsdom@0.2.4 
│ ├── contextify@0.0.5 
│ ├── cssom@0.2.0 
│ ├── htmlparser@1.7.3 
│ └── request@2.1.1 
├── node-static@0.5.6 
├── redis@0.6.7 
├── underscore@1.1.6 
├── uri-js@1.2.0 
└── weld@0.2.1
```
    