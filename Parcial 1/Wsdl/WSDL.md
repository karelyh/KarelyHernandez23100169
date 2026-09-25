# Estructura de un archivo WSDL

Fuente: [GeeksforGeeks - WSDL Full Form](https://www.geeksforgeeks.org/blogs/wsdl-full-form/)

![WSDL](https://media.geeksforgeeks.org/wp-content/uploads/20200427212414/WSDL.png)

## ¿Qué es WSDL?

**WSDL (Web Services Description Language)** es un lenguaje basado en **XML** que se utiliza para describir un **Web Service SOAP**. Funciona como un contrato entre el cliente y el servidor, ya que especifica qué operaciones ofrece el servicio, qué datos recibe y devuelve, cómo se realiza la comunicación y dónde está disponible.

**WSDL no es un protocolo; es un lenguaje para describir un servicio web.**

## Estructura de un archivo WSDL

Un archivo WSDL se organiza principalmente en los siguientes elementos:

### 1. `<types>`

Define los **tipos de datos** que utilizará el servicio. Generalmente utiliza **XSD (XML Schema Definition)** para establecer la estructura y tipos de los datos.

### 2. `<message>`

Define los **datos que se intercambian** entre el cliente y el Web Service. Normalmente se especifican mensajes de entrada y salida para las operaciones.

### 3. `<portType>`

Define de manera **abstracta las operaciones** que ofrece el servicio y los mensajes que utiliza cada operación.

En **WSDL 2.0**, este elemento se conoce como `<interface>`.

### 4. `<binding>`

Indica **cómo se realizará la comunicación** para las operaciones definidas en `portType`. En un Web Service SOAP, aquí se especifican los detalles relacionados con SOAP y el transporte, normalmente HTTP.

### 5. `<service>`

Agrupa los elementos que permiten acceder al servicio y especifica su **endpoint**, es decir, la dirección donde se encuentra disponible el Web Service.

## Relación con SOAP

En un Web Service SOAP, el archivo WSDL especifica cómo se envían los mensajes SOAP y dónde está publicado el servicio. Para ello, el elemento `<binding>` define el protocolo a utilizar, normalmente `soap:binding`, y el elemento `<soap:address>` indica la URL del servicio.

Esto permite que un cliente SOAP conozca exactamente el formato del mensaje, la operación a invocar y la ubicación del endpoint.

## ¿Para qué sirve?

WSDL permite que una aplicación conozca de manera precisa cómo utilizar un Web Service, sin necesidad de conocer cómo está programado internamente. Al estar estandarizado y basado en XML, también permite que algunas herramientas generen automáticamente código cliente a partir del archivo WSDL.

## Ejemplo básico

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions name="CalculadoraService"
             targetNamespace="http://ejemplo.com/calculadora"
             xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://ejemplo.com/calculadora"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema">

    <types>
        <xsd:schema targetNamespace="http://ejemplo.com/calculadora">
            <xsd:element name="sumarRequest">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="a" type="xsd:int"/>
                        <xsd:element name="b" type="xsd:int"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>

            <xsd:element name="sumarResponse">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="resultado" type="xsd:int"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
        </xsd:schema>
    </types>

    <message name="sumarRequestMessage">
        <part name="parameters" element="tns:sumarRequest"/>
    </message>

    <message name="sumarResponseMessage">
        <part name="parameters" element="tns:sumarResponse"/>
    </message>

    <portType name="CalculadoraPortType">
        <operation name="sumar">
            <input message="tns:sumarRequestMessage"/>
            <output message="tns:sumarResponseMessage"/>
        </operation>
    </portType>

    <binding name="CalculadoraSoapBinding" type="tns:CalculadoraPortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="sumar">
            <soap:operation soapAction="http://ejemplo.com/calculadora/sumar"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <service name="CalculadoraService">
        <port name="CalculadoraPort" binding="tns:CalculadoraSoapBinding">
            <soap:address location="http://ejemplo.com/calculadora/soap"/>
        </port>
    </service>

</definitions>
```