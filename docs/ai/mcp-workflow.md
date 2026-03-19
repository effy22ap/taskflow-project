# Configuración de Servidores MCP 

## 1. Investigación: ¿Qué es MCP?
El Model Context Protocol es un sistema que permite a Cursor conectar la IA con herramientas externas. No solo lee mi código, sino que puede "usar" programas adicionales para darme mejores respuestas.

## 2. Proceso de Instalación
He configurado el servidor MCP siguiendo estos pasos en Cursor:
1. Abrí **Cursor Settings** y navegué hasta **Tools & MCP**.
2. Hice clic en **Add Custom MCP**.
3. Instalé el servidor mediante el comando `npx` de Node.js.
4. Verifiqué que el servidor aparece en la lista de "Installed MCP Servers".

## 3. Consultas realizadas
Una vez instalado, utilicé la IA para:
- Consultar datos externos mediante el servidor.
- Pedir un análisis del contexto del proyecto que la IA normal no alcanzaba a ver.


## 4. Utilidad real
MCP es útil en proyectos reales para conectar la IA con la base de datos de la empresa, con la documentación técnica en la web o para que la IA pueda ejecutar tests automáticamente.

