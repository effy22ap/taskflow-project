# Comparativa de Herramientas de IA
En este documento se analizarán las diferencias, ventajas y desventajas de utilizar distintas IAs (ChatGPT y Claude) en el proceso de desarrollo de TaskFlow.

## 1. Explicación de Conceptos Técnicos
He solicitado a los asistentes que expliquen: **event loop, DOM y prototipos**.
| Concepto | ChatGPT (o1/4o) | Claude (4.6 Sonnet)

| **Event Loop** | Se centra en las llamadas en los timers y en   l os eventos de usuario dandodnes ejemplos basicos |Nos da una informacion mas detallada mas tecnica y enfocadas en las 3 areas que hay|
| **DOM** | Muy estructurado, ideal para principiantes ya que te da ejemplos de codigo para que pruebes y vea que pasa| Enfocado en la jerarquía de objetos y rendimiento aparte de visual y directo, conectándolo con HTML real. |
| **Prototipos** | Explicación rapida y sencilla con ejemplo de codigo para javaScript | una version muy detallada mas teoricamente pero a la vez nos proporciona un codigo de ejemplo  |

**Conclusión:** Claude ofrece la mayor profundidad técnica, aparte que te lo explica con diagramas visuales para una mejor claridad y si deseas mas detalles lo hace y nos permite ejecutar la simulacion, Pero chatgpt es como mas resumida y se preocupa mas de la forma practica que de la teoria, nos proporciona mas ejercios para practicar y entender.

---

## 2. Detección de Errores (Bug Hunting)
He pasado 3 funciones con errores intencionales:
1.  **Scope Error:** Usar una variable antes de definirla con `let`.
2.  **Bucle Infinito:** Un `while` sin condición de salida.
3.  **Temporal Dead Zone:** Declarar una variable sin antes iniziarla.

**Resultados:**
- **ChatGPT:** Me analizo rapido los errores y en la tercera opción me dio hasta otras dos opciones de como podria tambier funcionar el codigo,hace un resumen breve y explica los bugs de forma mas esqueumatica.
- **Claude:** Supo solucionar los problemas pero aparte tiene una visualizacion mejor y te explica el error de una manera mas interractiva, aparte de que te permite que veas y pruebes como seria con el error corregido y dando un resumen de los tres tipos de bugs.

---

## 3. Generación de Código desde Lenguaje Natural
Pedí implementar estas funciones:
1.  *“Una función que reciba un array  y devuelva solo los pares pero usando .filter().”*
2.  *“Una función que cnvierta una cadena de texto a 'Snake Case.”*
3.  *“Uso de fetch para obtener datos de API falas y manejar el error con try/cath”*

**Análisis de Calidad:**
- **ChatGPT:** Código estándar, funcional pero a veces usa sintaxis antigua.
- **Claude:** Código muy "limpio" y modular.

---

## 4. Conclusiones Finales
**ChatGPT** destaca en la **practica de ejercicios** (es más practico para iniciar en programacion, una sintaxis aveces mas larga y antigua).
**Claude** destaca en la **calidad del código** (es más limpio y legible).

