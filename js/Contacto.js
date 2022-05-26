export class Contacto {
        _id;
        _nombre;
        _celular;
        _mensaje;
        _urlImagen;
        
        constructor(id,nombre, celular, mensaje,urlImagen) {
          this._id = id;
          this._nombre = nombre;
          this._celular = celular;
          this._mensaje = mensaje;
          this._urlImagen=urlImagen;
        }
      
        get id() {
          return this._id;
        }
      
        get nombre() {
          return this._nombre;
        }
      
        set nombre(nombre) {
          this._nombre = nombre;
        }
      
        get celular() {
          return this._celular;
        }
      
        set celular(celular) {
          this._celular = celular;
        }
      
        get mensaje() {
          return this._mensaje;
        }
      
        set mensaje(mensaje) {
          this._mensaje = mensaje;
        }

        get urlImagen() {
          return this._urlImagen;
        }
      
        set urlImagen(urlImagen) {
          this._urlImagenn = urlImagen;
        }

      
      };