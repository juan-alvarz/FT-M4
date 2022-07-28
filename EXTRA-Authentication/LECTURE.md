# Authentication / Authorization

Son cosas muy diferentes, autenticación es comprobar que eres quien dices ser por ejemplo, autorización es que te permita hacer cosas, por ejemplo borrar elementos de una base de datos

# Cookies

Guarda información sobre la sesión

## JWT (json web token)

tiene
Encabezado -> tipo de token y un algoritmo de codificación ej.

```json
{ "alg": "HS256", "typ": "JWT" }
```

Payload -> Data ej.

```json
{ "sub": "123456789", "name": "John Doe", "iat": 1516239022 }
```

firma de verificación o token, ej.

```js
HMACSHA256 {
base64UrlEncode(header) +
base64UrlEncode(payload),
your-256-bit-secret /*Esta es la firma, es información delicada*/
}
```
