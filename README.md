# CI/CD con GitHub Actions — Trabajo Extraclase

Programación IV — Universidad Latina de Costa Rica.

> **Estudiante:** Yeremy Fernandez Alfaro
> **Cédula:** _completar_
> **Fecha de entrega:** _completar_

Aplicación web de demostración (Node.js + Express) usada para implementar y
evidenciar los cuatro ejercicios prácticos del trabajo extraclase de CI/CD
con GitHub Actions.

## 1. Estructura del proyecto

```
.github/workflows/
  ci.yml            # Ejercicio 1: Integración Continua
  cd.yml            # Ejercicio 2: Entrega/Despliegue Continuo (GitHub Pages)
  test-matrix.yml   # Ejercicio 3: Matrix strategy (versiones x SO)
src/
  app.js            # Definición de la app Express (rutas)
  index.js          # Punto de entrada / arranque del servidor
  utils.js          # Funciones utilitarias puras (probadas unitariamente)
tests/
  app.test.js       # Pruebas de integración de la API (supertest)
  utils.test.js      # Pruebas unitarias de las funciones utilitarias
public/              # Plantilla estática (artefacto base para GitHub Pages)
scripts/build.js     # Genera ./dist a partir de ./public con metadatos del build
package.json
.eslintrc.json        # Configuración de linting (equivalente a ESLint)
```

## 2. Ejecución local

```bash
npm install
npm run lint            # Linting (ESLint)
npm test                # Pruebas unitarias (Jest + Supertest)
npm run test:coverage   # Pruebas con reporte de cobertura
npm run build            # Genera el artefacto estático en ./dist
npm start                # Levanta el servidor en http://localhost:3000
```

Resultado local verificado antes de subir el proyecto: **23 pruebas
pasando**, lint sin errores, cobertura ≈ 83%.

## 3. Pasos para dejar el repositorio 100% funcional en GitHub

Estos son los pasos que faltan por hacer **desde tu cuenta de GitHub**
(no se pueden automatizar desde aquí porque requieren tu autenticación):

1. **Subir este proyecto a tu repositorio**
   (`https://github.com/Y0FZ/extra2`, actualmente vacío):
   ```bash
   cd extraclase-cicd
   git init
   git add .
   git commit -m "Trabajo extraclase: CI/CD con GitHub Actions"
   git branch -M main
   git remote add origin https://github.com/Y0FZ/extra2.git
   git push -u origin main
   ```
   Verificá antes que el repo sea **público** (`Settings → General →
   Danger Zone → Change visibility`), ya que el enunciado lo exige.

2. **Habilitar GitHub Pages con origen "GitHub Actions"**:
   `Settings → Pages → Build and deployment → Source: GitHub Actions`.
   Sin este paso, `cd.yml` fallará al intentar desplegar.

3. **Crear el environment `production`** con una regla de protección
   (requisito del Ejercicio 2):
   `Settings → Environments → New environment → production`.
   Ahí agregá al menos una regla, por ejemplo:
   - *Required reviewers*: agregate a vos mismo como aprobador, o
   - *Wait timer*: por ejemplo 1 minuto.

4. **(Opcional) Configurar branch protection en `main`**:
   `Settings → Branches → Add rule` → exigir pull request y que el
   check `CI Pipeline` pase antes de fusionar.

5. **(Opcional) Secrets para notificaciones**: si querés activar las
   notificaciones a Slack/Discord (pasos ya incluidos y condicionados en
   los workflows), agregá en
   `Settings → Secrets and variables → Actions`:
   - `SLACK_WEBHOOK_URL` (usado en `ci.yml`)
   - `DEPLOY_NOTIFY_WEBHOOK` (usado en `cd.yml`)

   Si no los configurás, esos pasos simplemente se omiten — el pipeline
   no falla.

6. **Crear una rama `develop`** (aunque sea vacía/igual a main) para que
   el disparador `push` a `develop` del CI tenga sentido, y hacé al menos
   un pull request de una rama feature hacia `main` para evidenciar el
   trigger de `pull_request`.

## 4. Qué dispara cada workflow

| Workflow | Disparador | Qué hace |
|---|---|---|
| `ci.yml` | push a `main`/`develop`, PR hacia `main` | lint, tests, cobertura como artifact, notificación (resumen + Slack opcional) |
| `cd.yml` | al completarse `ci.yml` exitosamente en `main` (o manual) | build del artefacto estático, despliegue a GitHub Pages con environment `production` |
| `test-matrix.yml` | push/PR (igual que CI) o manual | corre las pruebas en Node 18/20/22 combinado con Ubuntu/Windows (+ macOS incluido), `fail-fast: false` |

Después del primer push exitoso a `main`, la URL del sitio desplegado
aparecerá en la pestaña **Actions → CD Pipeline → deploy → environment
production**, y también en `Settings → Pages`. Documentá esa URL aquí:

> **URL desplegada:** `https://y0fz.github.io/extra2/` (se activa
> automáticamente tras el primer despliegue exitoso de `cd.yml`; confirmá
> el valor exacto en `Settings → Pages` una vez desplegado).

## 5. Evidencia requerida (capturas de pantalla)

El enunciado pide un documento con capturas que evidencien el trabajo.
Usá el archivo `EVIDENCIAS.md` incluido en este proyecto como plantilla:
tiene un espacio marcado para cada captura que se pide en la rúbrica
(ejecución exitosa de `ci.yml`, artifact de cobertura descargable,
ejecución de `cd.yml` con el environment `production`, sitio de GitHub
Pages funcionando, y la matriz de `test-matrix.yml` corriendo en paralelo
con sus distintas combinaciones).

## 6. Nota sobre integridad académica

El PDF del enunciado indica que el trabajo es individual y que las
entregas se revisan por similitud. Este proyecto es un punto de partida
funcional y probado; antes de entregarlo asegurate de: completar tus
datos personales, revisar y entender cada workflow (podés tener que
explicarlo), y personalizar al menos los textos/README para que refleje
tu propio trabajo.
