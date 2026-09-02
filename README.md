# BPDS - Todo App

Aplicación web para la gestión de tareas (Todo List), desarrollada como parte del proyecto **BPDS (Buenas Prácticas de Desarrollo de Software)**.

## 📋 Descripción

BPDS Todo App permite a los usuarios gestionar tareas de manera sencilla, incluyendo la creación, visualización, actualización y eliminación de tareas.

El proyecto está desarrollado utilizando **Next.js** y **TypeScript**, siguiendo buenas prácticas de desarrollo y una estructura organizada por responsabilidades.

## 🚀 Tecnologías

* **Next.js**
* **React**
* **TypeScript**
* **Node.js**
* **npm**
* **Git / GitHub**

## 📦 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js
* npm
* Git

Puedes comprobar las versiones con:

```bash
node --version
npm --version
git --version
```

## 🔧 Instalación

Clona el repositorio:

```bash
git clone https://github.com/CamiloMaduro/BPDS.git
```

Ingresa al proyecto:

```bash
cd BPDS
```

Instala las dependencias:

```bash
npm install
```

## ▶️ Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abre en el navegador:

```text
http://localhost:3000
```

## 📁 Estructura del proyecto

Una estructura general del proyecto es:

```text
BPDS/
├── app/
│   ├── actions/
│   │   ├── create.ts
│   │   ├── delete.ts
│   │   ├── read.ts
│   │   └── update.ts
│   │
│   ├── ...
│
├── lib/
│   └── todos.ts
│
├── public/
│
├── todos.json
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 📝 Funcionalidades

Actualmente el proyecto contempla las siguientes operaciones:

* ✅ Crear tareas
* ✅ Consultar tareas
* ✅ Actualizar tareas
* ✅ Eliminar tareas
* ✅ Marcar tareas como completadas
* ✅ Ordenar tareas por fecha de creación

## 📅 Modelo de datos

Cada tarea utiliza una estructura similar a:

```json
{
  "id": "1",
  "title": "Initial example task",
  "completed": false,
  "createdAt": "2024-06-01T12:00:00Z"
}
```

### Campos

| Campo       | Tipo      | Descripción                        |
| ----------- | --------- | ---------------------------------- |
| `id`        | `string`  | Identificador único de la tarea    |
| `title`     | `string`  | Nombre o descripción de la tarea   |
| `completed` | `boolean` | Indica si la tarea está completada |
| `createdAt` | `string`  | Fecha y hora de creación           |

## 🌿 Flujo de ramas

Para mantener organizado el desarrollo se utilizan ramas de Git.

Ejemplo:

```text
main
 │
 └── dev
      │
      ├── feature/todo-ui
      │
      └── fix/todo-created-at
```

### Convención de nombres

```text
feature/nombre-funcionalidad
fix/nombre-correccion
refactor/nombre-cambio
docs/nombre-documentacion
```

Ejemplos:

```bash
git switch -c feature/todo-ui
```

```bash
git switch -c fix/todo-created-at
```

## 💾 Commits

Se recomienda utilizar mensajes de commit claros y descriptivos.

Ejemplos:

```bash
git commit -m "feat: add todo creation"
```

```bash
git commit -m "fix: update todo timestamp field"
```

```bash
git commit -m "docs: update project README"
```

## 🔄 Flujo de trabajo

Un flujo recomendado para desarrollar nuevas funcionalidades:

```bash
git switch dev
git pull origin dev

git switch -c feature/nueva-funcionalidad
```

Realizar los cambios y posteriormente:

```bash
git add .
git commit -m "feat: add new functionality"
```

Subir la rama:

```bash
git push -u origin feature/nueva-funcionalidad
```

Finalmente, crear un **Pull Request** para integrar los cambios en la rama correspondiente.

## 🧹 Limpieza del proyecto

Si Next.js presenta problemas con archivos temporales o caché:

```bash
rm -rf .next
```

En Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next
```

Después:

```bash
npm run dev
```

## 👥 Contribución

1. Crear una rama a partir de `dev`.
2. Realizar los cambios.
3. Probar la funcionalidad.
4. Crear un commit descriptivo.
5. Subir la rama a GitHub.
6. Crear un Pull Request.
7. Esperar la revisión y aprobación.

## 📄 Licencia

Este proyecto es de carácter académico y forma parte del trabajo de **Buenas Prácticas de Desarrollo de Software (BPDS)**.
