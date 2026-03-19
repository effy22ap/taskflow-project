# Flujo de Trabajo con Cursor / IDEs de IA
Aquí se documentará cómo el uso de un IDE enfocado a la IA (como Cursor o las extensiones de VS Code) optimiza la escritura de código y la resolución de bugs.

# Flujo de Trabajo con Cursor

En este apartado documento cómo he utilizado las funciones nativas de IA del IDE Cursor para agilizar el desarrollo de TaskFlow.

## 1. Generación y Edición con Ctrl+K
He utilizado la función de edición en línea (`Ctrl+K`) para:
- Modificar rápidamente etiquetas HTML sin tener que escribir cada propiedad manualmente.
- Refactorizar pequeñas funciones de JavaScript para hacerlas más legibles.

## 2. Consulta de Código con Ctrl+L (Chat)
El chat contextual de Cursor me ha permitido:
- Entender mejor funciones complejas de filtrado de arrays.
- Localizar errores de sintaxis de forma inmediata sin salir del editor.

## 3. Predicción de Código (Copilot++ / Composer)
La función de autocompletado inteligente de Cursor me ha ayudado a:
- Escribir más rápido las clases de Tailwind CSS, ya que el editor sugiere la clase correcta basándose en el contexto del diseño lila previo.

## Conclusión
Cursor me ha ayudado ha mejorar dos cosas de mi codigo, la primera fue asegurarme que las funciones usadas por mi " onclick/oinout" sea compatibles para que no me falle en el runntime, osea el script con la url de Tailwind fue puesta debajo de la funcion de script, me la reordeno y me ajusto mi scrpt.js para que currentFilter me de las funciones anteriores (" onclick/oinout") sean accesibles desde el Window, ya que al estar declaradas con const puede hjacer que no sea accesible desde el HTML, me cambio el currentFilter por 'var' y me expuso las funciones de window usadas por HTML.
La segunda me ayudo a reordenar el tailwind.config para que se cargue antes del CDN de Tailwind.