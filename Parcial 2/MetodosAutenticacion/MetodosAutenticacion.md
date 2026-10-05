# Métodos de autenticación

La **autenticación** sirve para comprobar quién está haciendo una petición a una API y si tiene permiso para acceder a un recurso. Existen diferentes formas de hacerlo y cada una maneja la información de diferente manera.

## Autenticación básica

La **Basic Authentication** es una de las más sencillas. El cliente manda su **usuario y contraseña** en cada petición, normalmente dentro del encabezado `Authorization`. Los datos se convierten a **Base64**, pero esto no significa que estén cifrados, solo están codificados, por eso se recomienda usar HTTPS.

![Autenticación básica](https://lab.wallarm.com/wp-content/uploads/2024/03/228-Preview-min.jpg)

## Autenticación Digest

La **Digest Authentication** funciona de una forma un poco diferente. Primero el cliente pide un recurso y el servidor responde con un **challenge**. El cliente recibe esa cadena, la combina con sus datos y la pasa por una **función hash**, obteniendo una cadena hasheada que después manda al servidor.

El servidor hace el mismo proceso y compara los resultados para comprobar la identidad. Lo importante del hash es que **no se puede obtener fácilmente el valor original a partir de la cadena hasheada**.

![Digest Authentication](https://jiteshcodes.com/images/digest-authentication.jpg)

## Bearer Token

En la autenticación **Bearer**, el cliente utiliza un **token** para demostrar que tiene acceso. Este token normalmente se manda en el encabezado `Authorization`.

Por ejemplo:

`Authorization: Bearer token123`

El servidor recibe el token, lo valida y, si es correcto, permite acceder al recurso. Básicamente, **quien tiene el token puede usarlo**, por eso debe mantenerse seguro.

![Bearer Token](https://www.devopsschool.com/blog/wp-content/uploads/2021/05/What-is-bearer-token-authentication-1.png)

## API Key

La **API Key** es una clave que identifica al cliente y le permite utilizar una API. Es una cadena que normalmente proporciona el servidor o el servicio.

Se puede mandar en un **encabezado**, por ejemplo:

`X-API-Key: 123456`

También puede ir en la **URL**, aunque no es lo más recomendable porque puede quedar guardada en historiales o registros.

![API Key](https://miro.medium.com/1*nee8I9_c1robLAXoDjMRpw.png)

## JWT

**JWT (JSON Web Token)** es un token que permite enviar información entre el cliente y el servidor y comprobar que no haya sido modificada. Se utiliza mucho en APIs para autenticación.

Un JWT tiene **tres partes**, separadas por puntos:

`Header.Payload.Signature`

- **Header:** indica el tipo de token y el algoritmo utilizado.
- **Payload:** contiene los datos o *claims*, como el usuario, rol o fecha de expiración.
- **Signature:** es la firma que permite comprobar que el token no fue alterado.

Normalmente el JWT se manda como un **Bearer Token** en el encabezado `Authorization`.

![Ciclo de vida de un JWT](https://dc722jrlp2zu8.cloudfront.net/media/uploads/2019/12/04/cap3-seguridad2.png)

## OAuth

**OAuth** es un protocolo de **autorización** que permite que una aplicación acceda a ciertos recursos de un usuario sin tener que conocer directamente su contraseña.

En este proceso intervienen principalmente el **usuario**, la **aplicación**, el **servidor de autorización** y el **servidor de recursos**. El usuario da permiso, el servidor de autorización entrega un **token de acceso** y la aplicación utiliza ese token para acceder a los recursos que tiene permitidos.

La idea principal es que la aplicación no necesita conocer la contraseña del usuario y además se pueden controlar los permisos que tiene.

![OAuth](https://docs.oracle.com/cd/E55956_01/doc.11123/oauth_guide/content/images/oauth/oauth_overview.png)