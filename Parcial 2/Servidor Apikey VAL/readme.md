![CineAPI Banner](/docs/cineapi-banner.svg)

API REST para consultar películas, recibir archivos e iniciar sesión mediante una API Key.

## Autenticación
Para las rutas protegidas, inicia sesión en `POST /login`, copia la API Key recibida y presiona **Authorize**. Introduce la clave para probar las operaciones protegidas.

## Ejemplo de uso con cURL
```bash
curl -k -X GET "https://localhost:3000/peliculas/8" \
  -H "x-api-key: TU_API_KEY"
```

## Ejemplo de uso con JavaScript (Fetch)
```javascript
fetch('https://localhost:3000/peliculas/8', {
    headers: {
        'x-api-key': 'TU_API_KEY'
    }
}00)
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```