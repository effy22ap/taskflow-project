# Registro de Experimentos
Documentación de las pruebas realizadas durante el desarrollo, errores encontrados y cómo la IA ayuda a iterar sobre las soluciones.

# Registro de Experimentos con IA en TaskFlow

En este documento detallo tres experimentos realizados durante el desarrollo para probar los límites y la utilidad de los asistentes de IA.

---

## Experimento 1: Refactorización de Estilos con Tailwind
- **Hipótesis:** ¿Puede la IA convertir un diseño CSS tradicional a clases de Tailwind respetando una paleta de colores lila personalizada?
- **Proceso:** Se proporcionó un fragmento de CSS con `background-color: #e9d5ff` y se pidió la equivalencia en Tailwind.
- **Resultado:** **Exito.** La IA sugirió correctamente `bg-purple-200` y ayudó a configurar el `tailwind.config.js` para añadir un tono lila exacto cuando las clases por defecto no eran suficientes.

## Experimento 2: Resolución de Errores de Sincronización (Git)
- **Hipótesis:** ¿Es capaz la IA de guiarme paso a paso para resolver un conflicto de mezcla (Merge Conflict)?
- **Proceso:** Se presentó el error `[rejected] main -> main (fetch first)` y las marcas de conflicto (`<<<<<<< HEAD`).
- **Resultado:** **Exito parcial.** La IA explico correctamente los comandos `git pull` y `git add`, aunque la resoluciOn manual del archivo `README.md` requirió intervención humana para decidir qué texto mantener.

## Experimento 3: Optimización de la Lógica de LocalStorage
- **Hipótesis:** ¿Puede la IA detectar un fallo de persistencia si el usuario recarga la página rápidamente?
- **Proceso:** Se le pidió a la IA que revisara por qué el "Modo Oscuro" se desactivaba al pulsar F5.
- **Resultado:** **Exito.** La IA detectó que faltaba una llamada a `localStorage.getItem` al inicio del script y proporcionó el código corregido para que la preferencia del usuario se mantuviera siempre.

---

## Conclusiones de los Experimentos
Los experimentos demuestran que la IA es excelente para **traduccion de lenguajes** (CSS a Tailwind) y **deteccion de errores lógicos**, pero requiere supervision constante en tareas de **gestion de archivos (Git)** donde el contexto local es crítico.