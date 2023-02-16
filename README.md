# LifeLog AI

LifeLog AI es una aplicación de diario personal que utiliza inteligencia artificial para ayudarte a mantener un registro de tus pensamientos, sentimientos y emociones. La app te ayudará a detectar si tu día ha sido bueno o malo y a comprender mejor cómo te sientes. Con LifeLog AI, podrás llevar un seguimiento de tus emociones y progresar hacia una vida más equilibrada y feliz.

## Tech Stack

**Client:** Svelte, TailwindCSS

**Server:** Node, Express

## Features

- Incluye tus entradas para tenerlas en cuenta en la evaluación de los proximos posts
- Persiste en el navegador tus posts
- Boton de reseteo de datos

## Demo

https://llai.fly.dev/

## Run Locally

Clone the project

```bash
  git clone https://github.com/gonzaldd/lifelog-ai/
```

Go to the project directory

```bash
  cd lifelog-ai
```

Install dependencies

```bash
  yarn
```

Complete .env in back and front

Start the server

```bash
  yarn workspace back dev
```

Start the front

```bash
  yarn workspace front dev
```

## Roadmap

- ~~Permitir modificar el tipo y porcentaje en el listado de posts~~

- Agregar nuevas emociones al clasificador

- ~~Mejorar el responsive~~

## Authors

- [@gonzaldd](https://www.github.com/gonzaldd)
