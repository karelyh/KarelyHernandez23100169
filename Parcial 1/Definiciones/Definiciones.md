# Definiciones: API, REST y RESTful

## 1. API

![Comunicación entre una aplicación, una API y un servidor](https://www.fep.mx/images/blog/slide_blog_1280x820_que_es_un_api_y_cual_es_su_funcion.jpg)

Una API (*Application Programming Interface* o Interfaz de Programación de Aplicaciones) es un conjunto de reglas, métodos y protocolos que permite que diferentes aplicaciones o sistemas se comuniquen entre sí.

La API funciona como intermediario entre un cliente y un servidor. El cliente realiza una solicitud, la API la recibe y la procesa, y posteriormente devuelve una respuesta. De esta manera, el cliente puede utilizar información o funciones de otro sistema sin conocer su implementación interna.

### Elementos de una API

- **Cliente**: Aplicación que solicita información o una acción. Puede ser una página web, una aplicación móvil, un programa de escritorio u otro servidor.
- **Servidor**: Sistema que contiene los datos o las funciones solicitadas.
- **Solicitud**: Mensaje enviado por el cliente. Puede indicar qué recurso necesita y qué operación desea realizar.
- **Respuesta**: Resultado devuelto por el servidor, generalmente acompañado de un código de estado y datos.

### ¿Para qué sirven las API?

Las API permiten:

- Integrar diferentes aplicaciones y servicios.
- Compartir información de manera controlada.
- Reutilizar funciones ya existentes.
- Separar la interfaz de usuario de la lógica y los datos del sistema.
- Conectar aplicaciones desarrolladas con distintos lenguajes y tecnologías.

Por ejemplo, una aplicación puede solicitar información de un estudiante mediante:

```http
GET /estudiantes/23100169
```

La API podría responder con datos en formato JSON:

```json
{
  "nombre": "Karely Hernández",
  "numeroControl": "23100169",
  "carrera": "Ingeniería en Sistemas Computacionales"
}
```

## 2. REST

![Arquitectura de servicios web y comunicación entre sistemas](https://media.licdn.com/dms/image/v2/D5612AQHUtfE_NZiYBQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1681155201571?e=2147483647&v=beta&t=JUX6w6bHjKdvebGy4DC7GVyrIYMBHi7FR4MwkfTuThM)

REST (*Representational State Transfer* o Transferencia de Estado Representacional) es un estilo arquitectónico utilizado para diseñar sistemas distribuidos y servicios web. Fue propuesto por Roy Fielding en el año 2000.

REST no es un lenguaje de programación ni un protocolo. Es un conjunto de principios y restricciones que normalmente utiliza HTTP para organizar la comunicación entre clientes y servidores.

### Recursos en REST

REST organiza la información como **recursos**. Un recurso puede ser cualquier objeto o dato que pueda identificarse mediante una URI, por ejemplo:

```text
/estudiantes
/estudiantes/23100169
/productos
/productos/15
```

Los métodos HTTP indican la operación que se desea realizar sobre cada recurso:

| Método | Operación | Ejemplo |
| --- | --- | --- |
| **GET** | Consultar información | **GET /productos** |
| **POST** | Crear un recurso | **POST /productos** |
| **PUT** | Actualizar un recurso completo | **PUT /productos/15** |
| **PATCH** | Actualizar una parte del recurso | **PATCH /productos/15** |
| **DELETE** | Eliminar un recurso | **DELETE /productos/15** |

### Principios de REST

- **Cliente-servidor**: El cliente se encarga de la interfaz y el servidor de los datos y la lógica. Ambos pueden desarrollarse de manera independiente.
- **Sin estado (*stateless*)**: Cada solicitud debe contener toda la información necesaria para ser procesada. El servidor no depende de solicitudes anteriores.
- **Interfaz uniforme**: Los recursos y métodos HTTP se utilizan de forma coherente y predecible.
- **Representaciones**: Los recursos se intercambian mediante formatos como JSON. Esta representación no tiene que coincidir con la forma en que los datos se almacenan internamente.
- **Almacenamiento en caché**: Algunas respuestas pueden guardarse temporalmente para reducir solicitudes y mejorar el rendimiento.
- **Sistema en capas**: Puede haber intermediarios entre el cliente y el servidor, como servicios de seguridad o balanceadores, sin que el cliente tenga que conocerlos.
- **Código bajo demanda**: El servidor puede enviar código ejecutable al cliente. Es una restricción opcional.

## 3. RESTful

![Desarrollo de una API RESTful](https://blog.back4app.com/wp-content/uploads/2023/04/rest-cover.webp)

El término *RESTful* se utiliza para describir una API o servicio que implementa correctamente los principios y restricciones de REST. No es un protocolo diferente ni un lenguaje de programación.

Una API RESTful normalmente:

- Identifica sus recursos mediante URI.
- Utiliza los métodos HTTP de acuerdo con su propósito.
- Mantiene separadas las responsabilidades del cliente y del servidor.
- Procesa solicitudes independientes y sin estado.
- Utiliza representaciones como JSON para intercambiar información.
- Devuelve códigos de estado HTTP apropiados, por ejemplo:
  - **200 OK**: Solicitud procesada correctamente.
  - **201 Created**: Recurso creado correctamente.
  - **404 Not Found**: Recurso no encontrado.
  - **500 Internal Server Error**: Error en el servidor.

Por ejemplo, si una API RESTful administra productos, puede utilizar **GET /productos** para consultarlos, **POST /productos** para crear uno y **DELETE /productos/15** para eliminar el producto identificado con el número 15.

## Comparativa

| Concepto | ¿Qué es? | Característica principal | Ejemplo |
| --- | --- | --- | --- |
| **API** | Interfaz que permite la comunicación entre aplicaciones. | Define cómo realizar solicitudes y recibir respuestas. | Una aplicación consulta los datos de un estudiante. |
| **REST** | Estilo arquitectónico para diseñar servicios web. | Organiza la comunicación mediante recursos y métodos HTTP. | Usar **GET /productos** para consultar productos. |
| **RESTful** | API o servicio que implementa los principios de REST. | Utiliza REST de manera coherente y adecuada. | Una API que usa recursos, HTTP y solicitudes sin estado. |

## Conclusión

Una **API** es una interfaz que permite la comunicación entre aplicaciones. **REST** es un estilo arquitectónico basado en recursos, HTTP y restricciones como la separación cliente-servidor y la ausencia de estado. **RESTful** describe una API o servicio que sigue correctamente los principios de REST.

## Bibliografía

- [¿Qué es una API?](https://aws.amazon.com/es/what-is/api/)
- [¿Qué es una API RESTful?](https://aws.amazon.com/es/what-is/restful-api/)
- [¿Qué es una API REST?](https://www.ibm.com/mx-es/think/topics/rest-apis)
- [REST](https://developer.mozilla.org/es/docs/Glossary/REST)
- [¿Qué es una API y cuál es su función?](https://www.fep.mx/blog/que_es_un_api_y_cual_es_su_funcion/)



