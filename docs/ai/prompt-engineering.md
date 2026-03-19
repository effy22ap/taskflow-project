# Ingeniería de Prompts
Este espacio está dedicado a registrar las técnicas de prompting utilizadas para obtener mejores resultados del modelo de lenguaje, incluyendo ejemplos de prompts.

# Ingeniería de Prompts en el Proyecto TaskFlow

En este documento registro 10 experimentos de prompting utilizados para optimizar el desarrollo de la aplicación, aplicando técnicas avanzadas de comunicación con modelos de IA.

## 1. Definición de Rol (Persona Prompting)
> **Prompt:** "Actúa como un desarrollador Senior Frontend experto en accesibilidad (WCAG). Revisa mi archivo index.html y dime si mis botones son usables para personas que navegan solo con teclado."
* **Por qué funciona:** Al darle un rol, la IA activa un "set" de conocimientos específicos (en este caso, accesibilidad) que de otra forma omitiría.

## 2. Razonamiento Paso a Paso (Chain of Thought)
> **Prompt:** "Explica paso a paso cómo funciona el flujo de datos desde que el usuario escribe una tarea hasta que se guarda en LocalStorage. No escribas código aún, solo la lógica."
* **Por qué funciona:** Obliga a la IA a descomponer el problema en partes pequeñas, evitando errores lógicos antes de empezar a programar.

## 3. Few-shot Prompting (Con ejemplos)
> **Prompt:** "Quiero añadir etiquetas de prioridad. Ejemplo: 'Comprar pan [Alta]'. Si escribo 'Lavar coche [Baja]', el color debe ser azul. Si escribo 'Estudiar [Media]', el color debe ser naranja. Genera el código para una nueva tarea que sea 'Gimnasio [Alta]'."
* **Por qué funciona:** Al darle ejemplos previos, la IA entiende el patrón exacto que queremos replicar sin necesidad de explicaciones largas.

## 4. Restricciones Claras (Negative Constraints)
> **Prompt:** "Refactoriza la función renderTasks para que sea más corta, pero NO utilices librerías externas ni cambies los nombres de las clases de Tailwind que ya existen."
* **Por qué funciona:** Las restricciones evitan que la IA sugiera soluciones que "rompan" el resto del proyecto o que añadan dependencias innecesarias.

## 5. Formato de Salida Específico
> **Prompt:** "Analiza mi script.js y devuélveme una tabla con tres columnas: Nombre de la función, Parámetros que recibe y qué es lo que hace."
* **Por qué funciona:** Facilita la documentación rápida y permite leer la estructura del código de un vistazo.

## 6. Prompt para Debugging Contextual
> **Prompt:** "Tengo un error de 'ReferenceError: resultado is not defined' en la línea 45. Aquí tienes mi código. Localiza el error y explícame por qué el ámbito (scope) de la variable está fallando."
* **Por qué funciona:** Da el contexto del error y el código fuente, permitiendo una solución directa en lugar de una genérica.

## 7. Generación de Casos de Prueba (Edge Cases)
> **Prompt:** "Genera una lista de 5 cosas raras que un usuario podría intentar hacer en mi TaskFlow para intentar romper la aplicación (por ejemplo, nombres de tareas con emojis o códigos HTML)."
* **Por qué funciona:** Ayuda a prever errores de seguridad o de visualización que a un humano se le podrían pasar.

## 8. Optimización de Estilos (Tailwind Expert)
> **Prompt:** "Actúa como un diseñador de UI. Sugiere una paleta de colores complementaria para mi diseño lila que funcione bien en modo oscuro sin perder el contraste 4.5:1."
* **Por qué funciona:** Usa el conocimiento estético de la IA para mejorar la interfaz sin que el programador tenga que saber de teoría del color.

## 9. Documentación Automática de Funciones
> **Prompt:** "Escribe un comentario de JSDoc para la siguiente función, explicando claramente qué devuelve y qué tipos de datos espera."
* **Por qué funciona:** Mantiene el código profesional y bien documentado con un esfuerzo mínimo.

## 10. Refactorización para Clean Code
> **Prompt:** "Revisa este bucle for y conviértelo a una función .map() o .forEach() que sea más legible y moderna siguiendo los estándares de ES6."
* **Por qué funciona:** Mejora la calidad del código basándose en estándares modernos de la industria.