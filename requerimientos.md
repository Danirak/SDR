Característica: Inicio de sesión con Google (SSO)
  Escenario: Acceso con dominio permitido
    Dado que el usuario posee un correo institucional válido
    Cuando intenta iniciar sesión con Google
    Entonces el sistema concede acceso
    Y registra la sesión iniciada

  Escenario: Acceso con dominio no permitido
    Dado que el usuario posee un correo de dominio no autorizado
    Cuando intenta iniciar sesión con Google
    Entonces el sistema deniega el acceso
    Y muestra un mensaje claro de dominio no permitido

Característica: Visualización de calendario semanal
  Escenario: Ver disponibilidad de la semana actual
    Dado que el usuario inició sesión
    Cuando abre el calendario semanal
    Entonces ve bloques de 1 hora dentro del horario operativo
    Y cada bloque indica si está disponible u ocupado

Característica: Reserva dentro de anticipación mínima y máxima
  Escenario: Crear reserva válida
    Dado que el usuario tiene menos de 3 horas reservadas para el día seleccionado
    Y que el bloque seleccionado inicia entre 5 horas y 7 días desde ahora
    Y el bloque está disponible
    Cuando confirma la reserva
    Entonces la reserva se crea
    Y el bloque queda marcado como ocupado por el usuario

  Escenario: Rechazo por anticipación fuera de rango
    Dado que el bloque inicia en menos de 5 horas o en más de 7 días
    Cuando el usuario intenta reservar
    Entonces el sistema rechaza la reserva
    Y muestra un motivo de rechazo por anticipación

Característica: Límite diario de 3 horas
  Escenario: Impedir exceder el cupo diario
    Dado que el usuario ya tiene 3 horas reservadas hoy
    Cuando intenta reservar una hora adicional para hoy
    Entonces el sistema rechaza la reserva
    Y muestra un mensaje indicando superación del límite diario

Característica: Sin solapamientos
  Escenario: Impedir reservas superpuestas
    Dado que el usuario tiene una reserva vigente que cubre un bloque
    Cuando intenta reservar otro bloque que se solapa en tiempo
    Entonces el sistema rechaza la nueva reserva
    Y muestra un mensaje indicando solapamiento

Característica: Edición y cancelación por estudiante
  Escenario: Editar antes del inicio
    Dado que existe una reserva del usuario que aún no inicia
    Cuando el usuario cambia el bloque a otro disponible dentro de reglas
    Entonces la reserva se actualiza
    Y se mantiene el historial sin duplicados

  Escenario: Cancelar antes del inicio
    Dado que existe una reserva del usuario que aún no inicia
    Cuando el usuario la cancela
    Entonces la reserva queda en estado "cancelada"
    Y el bloque vuelve a estar disponible

Característica: Recordatorios de reserva
  Escenario: Enviar recordatorio por defecto
    Dado que el usuario no desactivó recordatorios
    Y falta el intervalo configurado (por defecto 3 horas) para el inicio de la reserva
    Cuando se ejecuta el proceso de notificaciones
    Entonces el usuario recibe un recordatorio de su reserva

Característica: Historial y faltas del usuario
  Escenario: Ver historial personal
    Dado que el usuario inició sesión
    Cuando abre su perfil
    Entonces visualiza lista de reservas con estados y contador de faltas del mes y totales

Característica: Administración de usuarios
  Escenario: Crear usuario
    Dado que el administrador ingresa RUT, nombre, correo y rol válidos
    Cuando confirma la creación
    Entonces el usuario queda creado y habilitado
    Y se envía un correo con credenciales o instrucciones de acceso

  Escenario: Cambiar rol
    Dado que existe un usuario activo
    Cuando el administrador modifica su rol
    Entonces el nuevo rol queda aplicado
    Y los permisos se actualizan inmediatamente

  Escenario: Inhabilitar usuario
    Dado que existe un usuario activo
    Cuando el administrador lo inhabilita
    Entonces el usuario no puede iniciar sesión
    Y se conserva su historial

Característica: Gestión administrativa de reservas
  Escenario: Crear/editar/eliminar reserva de un tercero con motivo
    Dado que el administrador selecciona una reserva de un estudiante
    Cuando crea, edita o elimina la reserva proporcionando un motivo
    Entonces la operación se ejecuta
    Y el motivo queda registrado en el historial de la reserva

Característica: Marcar falta
  Escenario: Registrar inasistencia
    Dado que una reserva pasó su horario sin asistencia registrada
    Cuando el administrador marca "falta" con un motivo opcional
    Entonces la reserva queda en estado "no asistió"
    Y se incrementa el contador de faltas del usuario

Característica: Parámetros del sistema
  Escenario: Cambiar anticipación y horario operativo
    Dado que el administrador define nuevos valores de anticipación mínima/máxima y horario operativo válidos
    Cuando guarda la configuración
    Entonces los nuevos valores se aplican a futuras validaciones de reserva

Característica: Reportes y métricas
  Escenario: Ver uso semanal y ranking
    Dado que existen reservas en el período consultado
    Cuando el administrador abre el reporte semanal
    Entonces ve el porcentaje de ocupación y ranking por horas utilizadas

Característica: Zona horaria y cambio de hora (DST)
  Escenario: Mostrar y validar en America/Santiago
    Dado que la zona horaria del sistema es America/Santiago
    Cuando se visualizan reservas que atraviesan un cambio de hora
    Entonces los horarios se muestran correctamente ajustados
    Y las validaciones de anticipación y solapamiento respetan la zona horaria

Característica: Mensajes de error claros
  Escenario: Mostrar motivo al rechazar una acción
    Dado que el usuario realiza una acción que viola una regla de negocio
    Cuando el sistema rechaza la acción
    Entonces se muestra un mensaje que indica la regla infringida
    Y no se realiza ningún cambio en datos persistidos

Característica: Prevención de duplicados (idempotencia)
  Escenario: Evitar doble creación por doble clic
    Dado que el usuario intenta crear la misma reserva dos veces en milisegundos
    Cuando el sistema recibe solicitudes duplicadas
    Entonces solo se crea una reserva
    Y se retorna una respuesta coherente para la segunda solicitud
