Este es un proyecto NextJS para prueba técnica de front-end

## Cómo iniciar:

1. Primero abrir la terminal e instalar dependencias con algún gestor de paquetes de NodeJS
   (npm, yarn, pnpm o bun):

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Luego ejecutarlo con uno de los siguientes comandos:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Por último abrir [http://localhost:3000](http://localhost:3000) con su navegador de preferencia para visualizar los resultados.

## Cómo usar el sitio

1. Usted será bienvenido por un formulario para registrar un nuevo usuario con sus respectivos detalles de cuenta y monto inicial.

2. Tras presionar el botón registrar usted será redirigido a su perfil. (Debido a la no existencia de un login, tras escribir un número de cuenta bancaria ya existente usted accederá a dicha cuenta sin sobreescribir ningún dato).

3. Acá podrá realizar operaciones de transacción y podrá visualizar su balance, cuánto ha depositado y cuánto ha retirado.

## Tecnologías utilizadas y detalles técnicos

- NextJS, ReactJS, Typescript, CSS.
- Las peticiones al back-end basadas en promesas son simuladas, usando como herramienta para mocking el local storage del navegador.
- El manejo del estado de las peticiones y el renderizado de estas es completamente manual.
- Existe un delay de 1 segundo por cada petición get para simular renderizado en conexiones lentas.
- No existen dependencias externas, todos los componentes y estilos usados se encuentran dentro del proyecto.
- Los estilos de la aplicación están separados de manera jerárquica, siendo los más cercanos a los components aquellos más específicos.
